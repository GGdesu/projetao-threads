import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function historicoScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();
    
    return (
        <View style={styles.container}>
          <View style={styles.square}>
          <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <View>
              <Text style={styles.storeName}>Entregador</Text>
              <Text style={styles.ownerName}>Nome do Entregador</Text>
            </View>
          </View>
          </View>
          <View style={styles.historico}>
            <Text style={styles.title}>Histórico</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Faturamento no período</Text>
                <Text>R$230,25</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Numero de entregas</Text>
                <Text>55</Text>
              </View>              
            </View>
          </View>
          <View style={styles.linha} />
          <View style={styles.containerEntrega}>
            <Text> Sab. 26 julho 2024</Text>
            <View style={styles.ultimaEntrega}>
                <Text style={{ fontWeight: 'bold' }}>Restaurante ABC</Text>
                <Text style={{ fontWeight: 'bold' }}>Atraso:</Text>
            </View>
          </View>
          <View style={styles.containerEntrega}>
            <Text> Sab. 26 julho 2024</Text>
            <View style={styles.ultimaEntrega}>
                <Text style={{ fontWeight: 'bold' }}>Restaurante ABC</Text>
                <Text style={{ fontWeight: 'bold' }}>Atraso:</Text>
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      containerEntrega: {
        flexShrink: 1,
        padding: 20,
      },
      header: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
      },
      storeName: {
        fontSize: 16,        
      },
      ownerName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      historico: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        flexShrink: 1,     
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
      },
      infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      infoBox: {
        width: '45%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'flex-start',
      },
      square: {
        height: 100,
        backgroundColor: '#d3d3d3',        
      },
      linha: {
        height: 1, 
        backgroundColor: '#000', 
        marginVertical: 10, 
      },
      ultimaEntrega: {
        flexShrink: 1,
        backgroundColor: '#d3d3d3',
        marginTop: 10,
        padding: 20, 
        alignItems: 'flex-start', 
      },
      containerChat: {
        padding: 5,
    },
      chat: {
        color: "#fff",
        fontSize: 16,
        //backgroundColor: Color.colorBlack,
    },
    });
