import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import LoginScreen from '../login';
import { getActiveUser, getActiveUserData } from '@/utils/supabaseUtils';
import { Corrida, UserData } from '@/utils/dataInterface';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '@/context/userContext';



export default function TelaInicial() {
    const router = useRouter()

    //utilizando o contexto
    const { user, setUser } = useUser()

    const [filtro, setFiltro] = useState('Todas');
    //const [userData, setUserData] = useState<UserData | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        getUser()
    }, [])
    
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) {
                setUser(userData);
            }
        };

        fetchUser();
    }, []);

    const [corridas, setCorridas] = useState<Corrida[]>([]);

    useEffect(() => {      
        const fetchEntregas = async () => {
          try {
            // Obtendo o usuário logado
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
            if (sessionError) {
              throw sessionError;
            }
      
            const userId = sessionData.session?.user.id; // Obtendo o ID do usuário logado
      
            if (!userId) {
              console.error('Usuário não está logado');
              return;
            }
      
            // Buscando entregas do entregador logado
            const { data, error } = await supabase
              .from('entrega') // Nome da tabela
              .select('*')
              .eq('situacao_corrida', 'ativa'); 
      
            if (error) {
              throw error;
            }
      
            // Populando a lista de corridas
            corridas.push(...(data as Corrida[]));
            
          } catch (error) {
            console.error('Erro ao buscar entregas:', error);
          }
        };
      
        fetchEntregas();
      }, []);

    //pegar infos do banco de dados
    async function getUser() {
        try {

            const userData = await getActiveUserData()

            if (!userData) {
                console.log("erro ao pegar dados do usuario")
                return null
            }

            if (userData) {
                setUser(userData)
            }
            //console.log(userData)
            //setLoading(false)

        } catch (error) {
            console.log(error)
            return null

        }

    }

    const [situacaoCorrida, setSituacaoCorrida] = useState<null | string>(null);

    const aceitarCorrida = async (corridaId: string) => {
        try {
            // Verifique se o usuário está disponível no contexto
            if (!user || !user.id) {
                console.error('Usuário não está autenticado ou não possui um ID válido');
                return;
            }
    
            // Verificar se o usuário já existe na tabela 'usuario'
            const { data: usuario, error: erroVerificacao } = await supabase
                .from('usuario')
                .select('id')
                .eq('id', user.id)
                .single(); // Use single para garantir que esperamos apenas um resultado
    
            if (erroVerificacao) {
                console.error('Erro ao verificar a existência do usuário na tabela usuario:', erroVerificacao);
                return;
            }
    
            if (!usuario) {
                console.error('Usuário não encontrado na tabela usuario.');
                return;
            }
    
            // Atualizar a corrida com o ID do entregador na tabela `entrega`
            const { data, error } = await supabase
                .from('entrega')
                .update({
                    situacao_corrida: 'andamento',
                    entregador_id: user.entregador_id,  
                    nome_entregador: user.nome || 'Nome do Entregador', 
                    telefone_entregador: user.telefone || 'Telefone do Entregador' 
                })
                .eq('id', corridaId);
    
            if (error) {
                console.error('Erro ao atualizar a corrida:', error);
                return;
            }
    
            console.log('Corrida atualizada com sucesso:', data);
    
            // Chame a função de atualização para garantir que a lista seja atualizada
            await atualizarCorridas();
        } catch (error) {
            console.error('Erro ao aceitar corrida:', error);
        }
    };    

    const atualizarCorridas = async () => {
        try {
            // Fazendo a busca apenas das corridas ativas
            const { data, error } = await supabase
                .from('entrega')
                .select('*')
                .eq('situacao_corrida', 'ativa');  // Filtrando para obter apenas corridas ativas
    
            if (error) {
                throw error;
            }
    
            // Atualiza o estado com as novas corridas, substituindo as antigas
            setCorridas(data as Corrida[]);
        } catch (error) {
            console.error('Erro ao atualizar corridas:', error);
        }
    };

    const renderCorrida = ({ item }: { item: Corrida }) => (
        <TouchableOpacity
            key={item.id}  // Usar o ID da corrida como chave, que é único
            style={[styles.card, item.atrasada && styles.cardAtrasada]}
            onPress={() => router.push({
                pathname: "/detalheAndamentoLojista",
                params: { corridaId: item.id }
            })}>
            <Image style={styles.entregadorImage} source={{ uri: 'https://via.placeholder.com/100' }} />
            <View style={styles.cardInfo}>
                <Text style={styles.entregadorNome}>Loja: <Text style={styles.boldText}>{item.nome_lojista}</Text></Text>
                <Text style={styles.cardText}>Coleta: {item.coleta}</Text>
                <Text style={styles.cardText}>Previsão de entrega: {item.previsaoEntrega}</Text>
                <Text style={styles.cardText}>Preço: {item.preco}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => aceitarCorrida(item.id)}>
                    <FontAwesome name="check" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {session && session.user ? (
                <View style={styles.container}>
                    {/* Cabeçalho do Restaurante */}

                    <View style={styles.header}>

                        <Image style={styles.restauranteImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                        <TouchableOpacity onPress={() => router.push({ pathname: "/pf_entregador_lojista" })}>
                            <View>

                                <Text style={styles.restauranteNome}>
                                    {user && user?.tipo_usuario === 1 && user?.nome_loja
                                        ? user.nome_loja
                                        : user && user?.tipo_usuario === 2 && user?.nome
                                            ? user.nome : "Nome indisponível"}
                                </Text>

                                <Text style={styles.restauranteLocalizacao}>{user && user?.endereco && user?.nome || user?.nome_loja
                                    ? user.endereco
                                    : "Endereço indisponivel"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ textAlign: "center", marginVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Corridas Em andamento</Text>
                    <Button title="Atualizar" onPress={atualizarCorridas} />
                    {/* Lista de Corridas */}
                    <FlatList
                        data={corridas}
                        renderItem={renderCorrida}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listaCorridas}
                        ListEmptyComponent={
                            <Text style={styles.emptyMessage}>Nenhuma entrega realizada ainda.</Text>
                        }
                    />
                </View>
            ) : (<LoginScreen />)}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        height: 200,
    },
    restauranteImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    restauranteNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    restauranteLocalizacao: {
        color: '#808080',
    },
    filtros: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    filtroButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 5,
    },
    filtroButtonAtivo: {
        backgroundColor: '#FF6F6F',
    },
    filtroButtonText: {
        color: '#000',
    },
    filtroButtonAtivoText: {
        color: '#fff',
    },
    listaCorridas: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#808080',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardAtrasada: {
        //backgroundColor: '#FF6F6F',
    },
    entregadorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#C4C4C4',
        marginRight: 15,
    },
    cardInfo: {
        flex: 1,
    },
    entregadorNome: {
        color: '#fff',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
    cardText: {
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 10,
        marginLeft: 10,
    },    
});
