import { ScrollView, Text, View, FlatList, StyleSheet, Image, ListRenderItem, TouchableOpacity, Modal } from "react-native";
import { Button } from "@rneui/base";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from '@/utils/supabase';

interface Entrega {
  id: string;
  entregador: string;
  valor: string;
  endereco: string;
  avaliacao: number;
}

export default function historicoScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();    
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null);
    const [gastosTotais, setGastosTotais] = useState<number | null>(null);
    const [tempoMedioAtraso, setTempoMedioAtraso] = useState<number | null>(null);
    const [corridasTotais, setCorridasTotais] = useState<number | null>(null);
    const [tempoMedioEntrega, setTempoMedioEntrega] = useState<number | null>(null);
    const [nomeLoja, setNomeLoja] = useState<string | null>(null);
    const [localizacao, setLocalizacao] = useState<string | null>(null);
    const [lojistaId, setLojistaId] = useState<string | null>(null);


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
  
          // Buscando entregas do usuário logado
          const { data, error } = await supabase
            .from('entrega') // Nome da tabela
            .select('*')
            .eq('lojista_id', userId); // Filtra as entregas pelo ID do usuário
  
          if (error) {
            throw error;
          }
          setEntregas(data as Entrega[]);
        } catch (error) {
          console.error('Erro ao buscar entregas:', error);
        }

        
      };
  
      fetchEntregas();
    }, []);

    useEffect(() => {
      const fetchHistorico = async () => {
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
  
          // Consultas ao banco de dados
          const { data: entregas, error: fetchError } = await supabase
            .from('entrega') // Nome da tabela
            .select('*')
            .eq('lojista_id', userId);
  
          if (fetchError) {
            throw fetchError;
          }
  
          if (entregas) {
            // Calcular gastos totais
            const totalGastos = entregas.reduce((acc, entrega) => acc + parseFloat(entrega.valor), 0);
            setGastosTotais(totalGastos);
  
            // Calcular o tempo médio de atraso
            const totalAtraso = entregas.reduce((acc, entrega) => acc + entrega.tempo_atraso, 0);
            const avgAtraso = entregas.length > 0 ? totalAtraso / entregas.length : 0;
            setTempoMedioAtraso(avgAtraso);
  
            // Corridas totais
            setCorridasTotais(entregas.length);
  
            // Tempo médio de entrega
            const totalEntrega = entregas.reduce((acc, entrega) => acc + entrega.tempo_entrega, 0);
            const avgEntrega = entregas.length > 0 ? totalEntrega / entregas.length : 0;
            setTempoMedioEntrega(avgEntrega);
          }
        } catch (error) {
          console.error('Erro ao buscar histórico:', error);
        }
      };
  
      fetchHistorico();
    }, []);

    useEffect(() => {
      if (!lojistaId) return;
  
      const fetchLojaInfo = async () => {
        try {
          const { data, error } = await supabase
            .from('usuario') // Tabela onde estão os dados da loja
            .select('nome_loja, endereco') // Colunas que você deseja selecionar
            .eq('id', lojistaId) // Filtro para buscar o lojista correto
            .single(); // Se espera um único registro
  
          if (error) {
            throw error;
          }
  
          setNomeLoja(data?.nome_loja || 'Nome da Loja não disponível');
          setLocalizacao(data?.endereco || 'Localização não disponível');
        } catch (error) {
          console.error('Erro ao buscar informações da loja:', error);
        }
      };
  
      fetchLojaInfo();
    }, [lojistaId]);

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
          <Text style={styles.textBold}>Entregador: {item.entregador}</Text>
          <Text style={styles.textBold}>Valor da entrega: {item.valor}</Text>
          <Text style={styles.textBold}>Endereço da entrega: {item.endereco}</Text>
          <Text style={styles.textBold}>Avaliação da entrega: {item.avaliacao}</Text>   
          <Text style={styles.textBold}>Clique para mais detalhes</Text>    
      </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
          <View style={styles.square}>
          <View style={styles.header}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <View>
              <Text style={styles.storeName}>{nomeLoja || 'Nome da Loja'}</Text>
              <Text style={styles.ownerName}>{localizacao || 'Localização'}</Text>
            </View>
          </View>
          </View>
          <View style={styles.historico}>
            <Text style={styles.title}>Histórico</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Gastos Totais</Text>
                <Text>R${gastosTotais?.toFixed(2) || '0,00'}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Tempo médio de atraso</Text>
                <Text>{tempoMedioAtraso !== null ? `${Math.round(tempoMedioAtraso)} minutos` : '0 minutos'}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Corridas Totais</Text>
                <Text>{corridasTotais || 0}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={{ fontWeight: 'bold' }}>Tempo médio de entrega</Text>
                <Text>{tempoMedioEntrega !== null ? `${Math.round(tempoMedioEntrega)} minutos` : '0 minutos'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.linha} />
          <Text style={styles.title}>Ultimas Entregas</Text>
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
                    <Text>Entregador: {selectedEntrega.entregador}</Text>
                    <Text>Valor da entrega: {selectedEntrega.valor}</Text>
                    <Text>Endereço da entrega: {selectedEntrega.endereco}</Text>
                    <Text>Avaliação da entrega: {selectedEntrega.avaliacao}</Text>
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
        fontSize: 18,
        fontWeight: 'bold',
      },
      ownerName: {
        fontSize: 16,
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
      textBold: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      chat: {
        color: "#fff",
        fontSize: 16,
        //backgroundColor: Color.colorBlack,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo opaco
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
      },
    });
