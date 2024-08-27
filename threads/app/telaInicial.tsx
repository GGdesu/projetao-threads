import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import LoginScreen from './login';
import { getActiveUser, getActiveUserData } from '@/utils/supabaseUtils';
import { Corrida, UserData } from '@/utils/dataInterface';



export default function TelaInicial() {
    const router = useRouter()

    const [filtro, setFiltro] = useState('Todas');
    const [userData, setUserData] = useState<UserData | null>(null);
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

    // if (loading) {
    //     console.log("tela de loading")
    //     return <ActivityIndicator size={"large"} color={"0000ff"} />
    // }

    const corridas: Corrida[] = [
        {
            id: '1',
            entregador: 'José',
            coleta: '21:32',
            previsaoEntrega: '21:52',
            atrasada: true,
        },
        {
            id: '2',
            entregador: 'Pedro',
            coleta: '22:32',
            previsaoEntrega: '23:02',
            atrasada: false,
        },
        // Adicione mais corridas aqui
    ];

    //pegar infos do banco de dados
    async function getUser() {
        try {

            const userData = await getActiveUserData()
            if (!userData) {
                console.log("erro ao pegar dados do usuario")
                return null
            }

            if (userData) {
                setUserData(userData)
            }
            console.log(userData)
            //setLoading(false)

        } catch (error) {
            console.log(error)
            return null
        }

    }


    const corridasFiltradas = corridas.filter(corrida =>
        filtro === 'Todas' || (filtro === 'Atrasadas' && corrida.atrasada)
    );

    const renderCorrida = ({ item }: { item: Corrida }) => (
        <TouchableOpacity style={[styles.card, item.atrasada && styles.cardAtrasada]}
            onPress={() => router.push({
                pathname: "/detalheAndamentoLojista",
                params: { corridaId: item.id }
            })}>
            <Image style={styles.entregadorImage} source={{ uri: 'https://via.placeholder.com/100' }} />
            <View style={styles.cardInfo}>
                <Text style={styles.entregadorNome}>Entregador: <Text style={styles.boldText}>{item.entregador}</Text></Text>
                <Text style={styles.cardText}>Coleta: {item.coleta}</Text>
                <Text style={styles.cardText}>Previsão de entrega: {item.previsaoEntrega}</Text>
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
                        <View>
                            <Text style={styles.restauranteNome}>
                                {userData && userData?.tipo_usuario === 1 && userData?.nome_loja
                                    ? userData.nome_loja
                                    : userData && userData?.tipo_usuario === 2 && userData?.nome
                                    ? userData.nome : "Nome indisponível"}
                            </Text>
                            <Text style={styles.restauranteLocalizacao}>Localização</Text>
                        </View>
                    </View>

                    <Text style={{ textAlign: "center", marginVertical: 14, fontSize: 20, fontWeight: 'bold' }}>Corridas Em andamento</Text>
                    {/* Filtros */}
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

                    {/* Lista de Corridas */}
                    <FlatList
                        data={corridasFiltradas}
                        renderItem={renderCorrida}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listaCorridas}
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
});
