import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function DetalhesDaCorrida() {

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

    return (
        <View style={styles.container}>
            {/* Seção de Detalhes da Corrida */}
            <View style={styles.header}>
                <Text style={styles.title}>Detalhes da corrida</Text>
            </View>

            {/* Seção de Previsão */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.subTitle}>Previsão: 23:02</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.raceNumber}>Nº 1136</Text>
                    <TouchableOpacity style={styles.statusButton}>
                        <Text style={styles.statusText}>Atrasada</Text>
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
                    <Text>Entregador: <Text style={styles.delivererName}>Pedro</Text></Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${'(81) 99999-9999'}`)}>
                        <Text>Telefone: <Text style={styles.delivererPhone}>(81) 99999-9999</Text></Text>
                    </TouchableOpacity>

                    <Text>{renderStars(5)}</Text>{/* Substitua por um componente de avaliação real */}
                </View>
            </View>

            {/* Linha divisória */}
            <View style={styles.divider} />

            {/* Seção de Informações da Corrida */}
            <View style={styles.infoContainer}>
                <Text><Text style={styles.boldText}>Preço da corrida:</Text> R$5,00</Text>
                <Text><Text style={styles.boldText}>Solicitada:</Text> 22:02</Text>
                <Text><Text style={styles.boldText}>Coleta:</Text> 22:32</Text>
                <Text><Text style={styles.boldText}>Endereço:</Text> Rua Lorem ipsum dolor sit amet, 03</Text>
            </View>

            {/* Botões Aceitar e Recusar */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.declineButton]}>
                    <Text style={styles.buttonText}>Recusar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
