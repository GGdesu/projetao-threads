import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/userContext';

const profilePictureLojista = require('@/assets/iconPng/shop_100x100.png');
const profilePictureEntregador = require('@/assets/iconPng/motorcycle.png');


const HeaderThreads: React.FC<HeaderProps> = ({ user: userParam }) => {
    const router = useRouter();

    const { user } = useUser();

    return (
        <View style={styles.header}>
            <Image style={styles.restauranteImage} source={user?.tipo_usuario === 1 ? profilePictureLojista : profilePictureEntregador} />

            <TouchableOpacity
                onPress={() =>
                    userParam?.tipo_usuario === 1
                        ? router.push({ pathname: "/perfilLojista" }) 
                        : userParam?.tipo_usuario === 2
                        ? router.push({ pathname: "/perfilEntregador" })
                        : Alert.alert("nenhuma rota, contexto sem informaçao do usuario: ",  user?.id)
                        
                }
            >
                <View>
                    <Text style={styles.restauranteNome}>
                        {userParam?.tipo_usuario === 1 && userParam?.nome_loja
                            ? userParam.nome_loja
                            : userParam?.tipo_usuario === 2 && userParam?.nome
                                ? userParam.nome
                                : "Nome indisponível"}
                    </Text>
                    <Text style={styles.restauranteLocalizacao}>
                        {userParam?.rua && userParam.bairro && userParam.cidade
                            ? `${userParam.rua}, ${userParam.numero}, \n${userParam.bairro}, ${userParam.cidade}`
                            : "Endereço indisponível"}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E3E3E3',
        height: 200
    },
    restauranteImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 20,
    },
    restauranteNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    restauranteLocalizacao: {
        //fontSize: 14,
        color: 'gray',
    },
});

export default HeaderThreads;

// header: {
//     flexDirection: 'row',
//     padding: 20,
//     backgroundColor: '#E3E3E3',
//     alignItems: 'center',
//     height: 200,
// },
// restauranteImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 20,
// },
// restauranteNome: {
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// restauranteLocalizacao: {
//     color: '#808080',
// },