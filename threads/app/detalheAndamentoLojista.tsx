import { useUser } from '@/context/userContext';
import { formatPhoneNumber } from '@/utils/mask';
import { formatarDataHoraISO } from '@/utils/misc';
import { getDelivers, updateDeliverSituation } from '@/utils/supabaseUtils';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

export default function DetalhesDaCorrida() {

    const { corridas, setCorridas } = useUser(); // A lista de corridas vinda do contexto
    const { corridaID, atrasada } = useLocalSearchParams(); // Pegando o ID da corrida da URL
    const { user } = useUser();
    const router = useRouter();

    const [disable, setDisable] = useState(false);

    // Encontrando a corrida específica com base no id
    const corrida = corridas?.find(corrida => corrida.id === corridaID);

    // Caso não tenha encontrado a corrida
    if (!corrida) {
        return (
            <View>
                <Text>Corrida não encontrada {corridaID}</Text>
            </View>
        );
    }


    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? 'star' : 'star-o'}
                    size={16}
                    color="#f1c40f"
                />
            );
        }
        return stars;
    };


    async function handleCancelarCorrida() {
        try {
            await updateDeliverSituation(corrida?.id, "cancelada")
            Alert.alert("Corrida Cancelada")
            getCorridas()
            router.navigate("/(tabs)/")

        } catch (error) {
            console.log("Foi Capturado um erro: ", error)

        }
    }
    
    //console.log(index)

    async function handleFinalizarCorrida() {
        try {
            await updateDeliverSituation(corrida?.id, "finalizada")
            Alert.alert("Corrida Finalizada")
            getCorridas()

            router.navigate("/(tabs)/")
            setDisable(true)

        } catch (error) {
            console.log("Foi Capturado um erro: ", error)

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

    return (
        <View style={styles.container}>
            {/* Seção de Detalhes da Corrida */}
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes da corrida</Text>
            </View>

            {/* Seção de Previsão */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.subTitle}>Previsão: {corrida.previsao_entrega}</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.raceNumber}>Nº 1136</Text>
                    <TouchableOpacity style={styles.statusButton}>
                        <Text style={styles.statusText}>{atrasada}</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* Seção do Entregador */}
            <View style={styles.delivererContainer}>
                <Image
                    style={styles.delivererImage}
                    source={{ uri: 'https://via.placeholder.com/150' }} // Substitua pela URL da imagem real
                />
                <View style={styles.delivererInfo}>
                    <Text>{user?.tipo_usuario === 1 ? "Entregador: " : "Restaurante"}<Text style={styles.delivererName}></Text>{user?.tipo_usuario === 1 ? corrida.nome_entregador : user?.nome_loja}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${user?.telefone}`)}>
                        <Text>Telefone: <Text style={styles.delivererPhone}>{formatPhoneNumber(user?.telefone.toString())}</Text></Text>
                    </TouchableOpacity>

                    <Text>{user?.tipo_usuario === 2 ? renderStars(5) : ""}</Text>{/* Substitua por um componente de avaliação real */}
                </View>
            </View>

            {/* Linha divisória */}
            <View style={styles.divider} />

            {/* Seção de Informações da Corrida */}
            <View style={styles.infoContainer}>
                <Text><Text style={styles.boldText}>Preço da corrida: R$</Text>{corrida.preco?.toFixed(2)}</Text>
                <Text><Text style={styles.boldText}>Solicitada:</Text> {formatarDataHoraISO(corrida.created_at)}</Text>
                <Text><Text style={styles.boldText}>Coleta:</Text> {corrida.coleta}</Text>
                <Text><Text style={styles.boldText}>Endereço de Entrega:</Text> {`${corrida.rua}, ${corrida.numero}, ${corrida.bairro}, ${corrida.cidade}`}</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                {user?.tipo_usuario === 2 && ( // Verifica se o tipo de usuário é 2
                    <Button
                    title="Finalizar Corrida"
                    onPress={handleFinalizarCorrida}
                    disabled={disable}
                    buttonStyle={{
                        backgroundColor: 'rgba(127, 220, 103, 1)',
                        borderRadius: 10
                    }}
                    containerStyle={{
                        height: 40,
                        width: '90%',
                        marginHorizontal: 10,
                    }}
                    titleStyle={{
                        color: 'white',
                        marginHorizontal: 20,
                    }}
                    />
                )}
                <Button
                    title="Cancelar Corrida"
                    onPress={handleCancelarCorrida}
                    disabled={disable}
                    buttonStyle={{
                        backgroundColor: 'rgba(127, 220, 103, 1)',
                        borderRadius: 10
                    }}

                    containerStyle={{
                        height: 40,
                        width: '90%',
                        marginHorizontal: 10,
                        marginVertical: 20,
                    }}
                    titleStyle={{
                        color: 'white',
                        marginHorizontal: 20,
                    }}
                />
            </View>

            {/* Botões Aceitar e Recusar */}
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.declineButton]}>
                    <Text style={styles.buttonText}>Recusar</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 40
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    raceNumber: {
        fontSize: 16,
        color: '#808080',
    },
    statusButton: {
        marginTop: 5,
        backgroundColor: '#FF6F6F',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
    },
    subTitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#808080',
    },
    delivererContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 10,
    },
    delivererImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        backgroundColor: '#C4C4C4', // Placeholder background color
    },
    delivererInfo: {
        justifyContent: 'center',
    },
    delivererName: {
        color: '#007BFF',
    },
    delivererPhone: {
        color: '#808080',
    },
    divider: {
        marginVertical: 20,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    infoContainer: {
        marginBottom: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: '#28a745',
        marginRight: 10,
    },
    declineButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
