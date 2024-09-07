import { ScrollView, Text, View, FlatList, StyleSheet, Image, ListRenderItem, TouchableOpacity, Modal } from "react-native";
import { Button } from "@rneui/base";
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { supabase } from '@/utils/supabase';
import HeaderThreads from "@/components/Header";
import { useUser } from "@/context/userContext";

interface Entrega {
  id: string;
  restaurante: string;
  valor: string;
  atraso: number;
}

export default function historicoScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null);
    const [faturamento, setFaturamento] = useState<number | null>(null);
    const [numeroEntregas, setNumeroEntregas] = useState<number | null>(null);
    const [entregadorNome, setEntregadorNome] = useState<string | null>(null);

    const { user } = useUser();
    

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
            .eq('entregador_id', userId); // Filtra as entregas pelo ID do entregador
  
          if (error) {
            throw error;
          }
          setEntregas(data as Entrega[]);
          
          // Calcular faturamento
          const totalFaturamento = data.reduce((acc, entrega) => acc + parseFloat(entrega.valor), 0);
          setFaturamento(totalFaturamento);
          
          // Número total de entregas
          setNumeroEntregas(data.length);
          
        } catch (error) {
          console.error('Erro ao buscar entregas:', error);
        }
      };
  
      fetchEntregas();
    }, []);

    useEffect(() => {
      const fetchEntregadorNome = async () => {
        try {
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
          if (sessionError) {
            throw sessionError;
          }
  
          const userId = sessionData.session?.user.id;
  
          if (!userId) {
            console.error('Usuário não está logado');
            return;
          }
  
          const { data, error } = await supabase
            .from('usuario') // Tabela onde estão os dados do entregador
            .select('nome') // Coluna que você deseja selecionar
            .eq('id', userId)
            .single();
  
          if (error) {
            throw error;
          }
  
          setEntregadorNome(data?.nome || 'Nome não disponível');
        } catch (error) {
          console.error('Erro ao buscar informações do entregador:', error);
        }
      };
  
      fetchEntregadorNome();
    }, []);

    const handlePressItem = (entrega: Entrega) => {
      setSelectedEntrega(entrega);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedEntrega(null);
    };

    const renderItem: ListRenderItem<Entrega> = ({ item }) => (
      <TouchableOpacity
          style={styles.ultimaEntrega}
          onPress={() => handlePressItem(item)}
        >
          <Text style={styles.textBold}>Restaurante: {item.restaurante}</Text>
          <Text style={styles.textBold}>Valor da entrega: {item.valor}</Text>
          <Text style={styles.textBold}>Atraso: {item.atraso} minutos</Text>
          <Text style={styles.textBold}>Clique para mais detalhes</Text>    
      </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
        <HeaderThreads user={ user }/>
        <View style={styles.historico}>
          <Text style={styles.title}>Histórico</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: 'bold' }}>Faturamento no período</Text>
              <Text>R${faturamento?.toFixed(2) || '0,00'}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={{ fontWeight: 'bold' }}>Número de entregas</Text>
              <Text>{numeroEntregas || 0}</Text>
            </View>              
          </View>
        </View>
        <View style={styles.linha} />
        <Text style={styles.title}>Últimas Entregas</Text>
        <View style={styles.container}>
          <FlatList
            data={entregas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>Nenhuma entrega realizada ainda.</Text>
            }
            contentContainerStyle={entregas.length === 0 ? { flexGrow: 1 } : undefined}
          />

          {/* Modal para exibir os detalhes da entrega */}
          {selectedEntrega && (
            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="fade"
              onRequestClose={closeModal}
            >
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalHeader}>Detalhes da Entrega</Text>
                  <Text>Restaurante: {selectedEntrega.restaurante}</Text>
                  <Text>Valor da entrega: {selectedEntrega.valor}</Text>
                  <Text>Atraso: {selectedEntrega.atraso} minutos</Text>
                  <Button title="Fechar" onPress={closeModal} />
                </View>
              </View>
            </Modal>
          )}
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
      textBold: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
      },
      modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      modalContent: {
        width: '80%', 
        padding: 20, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5, 
      },
      modalHeader: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        color: '#333', 
        textAlign: 'center', 
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
