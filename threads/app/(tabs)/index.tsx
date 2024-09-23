import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LoginScreen from '@/app/login';
import { useUser } from '@/context/userContext';
import { getActiveUserData, getDelivers } from '@/utils/supabaseUtils';
import HeaderThreads from '@/components/Header';
import { Corrida } from '@/utils/dataInterface';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';


export default function CorridasEmAndamento() {
    const router = useRouter()
    const [filtro, setFiltro] = useState('Todas');

    //pegando a informação do usuario atravez do contexto
    const { user, setUser } = useUser()
    const { corridas, setCorridas } = useUser()

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        getUser();
    }, [])

    useFocusEffect(
        useCallback(() => {
            getCorridas();
        }, [])
    )
    //pegar Entregas
    useEffect(() => {
        getCorridas()
    }, [user])

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

    async function getCorridas() {
        try {

            if (user?.tipo_usuario === 1) {
                const userCorrida = await getDelivers("lojista_id", user?.lojista_id)

                if (!userCorrida) {
                    console.log("erro ao tentar receber dados na variavel userCorrida: ", userCorrida)
                    return null
                }

                if (userCorrida) {
                    setCorridas(userCorrida)
                }

            } else if (user?.tipo_usuario === 2) {
                const userCorrida = await getDelivers("entregador_id", user?.entregador_id)

                if (!userCorrida) {
                    console.log("erro ao tentar receber dados na variavel userCorrida: ", userCorrida)
                    return null
                }

                if (userCorrida) {
                    setCorridas(userCorrida)
                }
            }

        } catch (error) {
            console.log("erro na função getCorridas: ", error)
            return null
        }
    }



    const corridasFiltradas = corridas?.filter(corrida => {
        const isAtrasadaEntrega = isAtrasada(corrida?.created_at, corrida?.previsao_entrega);
        const situacaoValida = corrida?.situacao_corrida === "andamento" || corrida?.situacao_corrida === "ativa";

        return (filtro === 'Todas' || (filtro === 'Atrasadas' && isAtrasadaEntrega)) && situacaoValida;
    })

    const renderCorridaLojista = ({ item }: { item: Corrida }) => (
        <TouchableOpacity style={[styles.card, isAtrasada(item?.created_at, item.previsao_entrega) && styles.cardAtrasada]}
            onPress={() => router.push({
                pathname: "/detalheAndamentoLojista",
                params: { corridaID: item?.id, atrasada: isAtrasada(item?.created_at, item.previsao_entrega) ? "Atrasada" : "Em Tempo" }
            })}>
            {/* <Image style={styles.entregadorImage} source={{ uri: 'https://via.placeholder.com/100' }} /> */}
            <View style={styles.cardInfo}>
                <Text style={styles.entregadorNome}>Entregador: <Text style={styles.boldText}>{item?.nome_entregador}</Text></Text>
                <Text style={styles.cardText}>Coleta: {item.coleta}</Text>
                <Text style={styles.cardText}>Previsão de entrega: {item?.previsao_entrega}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderCorridaEntregador = ({ item }: { item: Corrida }) => (
        <TouchableOpacity style={[styles.card, isAtrasada(item.created_at, item.previsao_entrega) && styles.cardAtrasada]}
            onPress={() => router.push({
                pathname: "/detalheAndamentoLojista",
                params: { corridaID: item.id }
            })}>
            {/* <Image style={styles.entregadorImage} source={{ uri: 'https://via.placeholder.com/100' }} /> */}
            <View style={styles.cardInfo}>
                <Text style={styles.entregadorNome}>Lojista: <Text style={styles.boldText}>{item.nome_lojista}</Text></Text>
                <Text style={styles.cardText}>Coleta: {item.coleta}</Text>
                <Text style={styles.cardText}>Previsão de entrega: {item.previsao_entrega}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {session && session.user ? (
                <View style={styles.container}>
                    {/* Cabeçalho do Restaurante */}
                    <HeaderThreads user={user} />

                    <Text style={{ textAlign: "center", marginVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Corridas Em andamento</Text>
                    {/* Filtros
                    <View style={styles.filtros}>

                        <TouchableOpacity
                            style={[styles.filtroButton, filtro === 'Todas' && styles.filtroButtonAtivo]}
                            onPress={() => setFiltro('Todas')}>
                            <Text style={filtro === 'Todas' ? styles.filtroButtonAtivoText : styles.filtroButtonText}>Todas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filtroButton, filtro === 'Atrasadas' && styles.filtroButtonAtivo]}
                            onPress={() => setFiltro('Atrasadas')}>
                            <Text style={filtro === 'Atrasadas' ? styles.filtroButtonAtivoText : styles.filtroButtonText}>Atrasadas</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Filtros e botão de atualizar */}
                    <View style={styles.filtrosContainer}>
                        <View style={styles.filtros}>
                            <TouchableOpacity
                                style={[styles.filtroButton, filtro === 'Todas' && styles.filtroButtonAtivo]}
                                onPress={() => setFiltro('Todas')}>
                                <Text style={filtro === 'Todas' ? styles.filtroButtonAtivoText : styles.filtroButtonText}>Todas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.filtroButton, filtro === 'Atrasadas' && styles.filtroButtonAtivo]}
                                onPress={() => setFiltro('Atrasadas')}>
                                <Text style={filtro === 'Atrasadas' ? styles.filtroButtonAtivoText : styles.filtroButtonText}>Atrasadas</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Botão para atualizar corridas */}
                        <TouchableOpacity
                            style={styles.atualizarButton}
                            onPress={getCorridas} // Chama a função para atualizar as corridas
                        >
                            <Text style={styles.atualizarButtonText}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lista de Corridas */}
                    <FlatList
                        data={corridasFiltradas}
                        renderItem={user?.tipo_usuario === 1 ? renderCorridaLojista : renderCorridaEntregador}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listaCorridas}
                        ListEmptyComponent={
                            <Text style={styles.emptyMessage}>Nenhuma entrega em andamento no momento.</Text>
                        }
                    />
                </View>
            ) : (<LoginScreen />)}
        </>
    );
}


// const isAtrasada = (previsao_entrega: string | null): boolean => {

//     if(previsao_entrega === null){
//         return false
//     }

//     const [horaEntrega, minutoEntrega] = previsao_entrega.split(':').map(Number);

//     const agora = new Date();

//     // Pega a hora e o minuto atuais
//     const horaAtual = agora.getHours();
//     const minutoAtual = agora.getMinutes();

//     // Verifica se a hora da entrega já passou
//     if (horaAtual > horaEntrega || (horaAtual === horaEntrega && minutoAtual > minutoEntrega)) {
//         return true; // Está atrasada
//     }

//     return false; // Não está atrasada
// };


//Falta verificar melhor o problema
const isAtrasada = (created_at: string, previsao_entrega: string | null): boolean => {
    if (previsao_entrega === null) {
        return false
    }

    // Cria um objeto 'moment' para a data e hora atuais
    const agora = moment();

    // Extrai a data de criação da corrida (sem a hora)
    const dataCriacao = moment(created_at, 'YYYY-MM-DD HH:mm:ss');

    // Extrai a hora e o minuto da previsão de entrega
    const [horaEntrega, minutoEntrega] = previsao_entrega.split(':').map(Number);

    // Combina a data de criação com a hora da previsão de entrega
    const dataHoraPrevisao = dataCriacao.clone().set({
        hour: horaEntrega,
        minute: minutoEntrega,
        second: 0,
    });
    //console.log(agora.isAfter(dataHoraPrevisao))
    // Verifica se o horário atual já ultrapassou a previsão de entrega
    return agora.isAfter(dataHoraPrevisao);
};

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
        backgroundColor: '#FF6F6F',
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
    cardText: {
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
    filtrosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    atualizarButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    atualizarButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
