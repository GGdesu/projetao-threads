import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


const HeaderThreads: React.FC<HeaderProps> = ({ user }) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Image style={styles.restauranteImage} source={{ uri: 'https://via.placeholder.com/100' }} />

            <TouchableOpacity
                onPress={() =>
                    user?.tipo_usuario === 1
                        ? router.push({ pathname: "/perfilLojista" })
                        : router.push({ pathname: "/pf_entregador_lojista" })
                }
            >
                <View>
                    <Text style={styles.restauranteNome}>
                        {user?.tipo_usuario === 1 && user?.nome_loja
                            ? user.nome_loja
                            : user?.tipo_usuario === 2 && user?.nome
                                ? user.nome
                                : "Nome indisponível"}
                    </Text>
                    <Text style={styles.restauranteLocalizacao}>
                        {user?.endereco
                            ? user.endereco
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
        borderRadius: 40,
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