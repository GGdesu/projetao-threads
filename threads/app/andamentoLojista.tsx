import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function CorridasEmAndamento({ navigation }) {
    const [filtro, setFiltro] = useState('Todas');

    const corridas = [
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

    const corridasFiltradas = corridas.filter(corrida =>
        filtro === 'Todas' || (filtro === 'Atrasadas' && corrida.atrasada)
    );

    const renderCorrida = ({ item }) => (
        <TouchableOpacity style={[styles.card, item.atrasada && styles.cardAtrasada]}
            onPress={() => navigation.navigate('DetalhesCorrida', { corridaId: item.id })}>
            <Image style={styles.entregadorImage} source={{ uri: 'https://via.placeholder.com/100' }} />
            <View style={styles.cardInfo}>
                <Text style={styles.entregadorNome}>Entregador: <Text style={styles.boldText}>{item.entregador}</Text></Text>
                <Text style={styles.cardText}>Coleta: {item.coleta}</Text>
                <Text style={styles.cardText}>Previsão de entrega: {item.previsaoEntrega}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Cabeçalho do Restaurante */}
            <View style={styles.header}>
                <Image style={styles.restauranteImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                <View>
                    <Text style={styles.restauranteNome}>Restaurante ABC</Text>
                    <Text style={styles.restauranteLocalizacao}>Localização</Text>
                </View>
            </View>

            <Text style={{textAlign: "center", marginVertical: 14, fontSize: 20, fontWeight: 'bold'}}>Corridas Em andamento</Text>
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