import { useUser } from '@/context/userContext';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';

interface Shopkeeper {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  profilePicture: any;
  cnpj: string;
  address: string;
  bankAccount: string;
  deliveries: number;
  totalSpent: string;
}

// Importando a imagem de perfil localmente com caminho relativo
const profilePicture = require('@/assets/images/shopkeeper.jpg');

const ShopkeeperProfileScreen: React.FC = () => {

  const { user, setUser } = useUser();

  const router = useRouter();

  const shopkeeper: Shopkeeper = {
    id: '1',
    name: 'Maria Souza',
    email: 'maria.souza@lojista.com',
    phone: '(11) 91234-5678',
    storeName: 'Loja da Maria',
    profilePicture: profilePicture,
    cnpj: '12.345.678/0001-99',
    address: 'Rua das Flores, 123, São Paulo, SP',
    bankAccount: 'Banco XYZ - Ag: 1234 - C/C: 56789-0',
    deliveries: 120,
    totalSpent: 'R$ 4.500,00',
  };

  const handleEditProfile = () => {
    // Navega para a tela de edição do perfil
    //navigation.navigate('EditShopkeeperProfile');
  };

  async function handleLogOut() {
   

    const {error} = await supabase.auth.signOut()


    if(error){
      Alert.alert("Erro ao desconectar: ", error.message)
    }else{
      setUser(null); // Limpar o usuário no contexto
      Alert.alert("Sucesso", "Voce foi desconectado!")
      router.navigate('/')
    }
    
  }

  const handleViewFullHistory = () => {
    // Navega para a tela de histórico completo de entregas
    //navigation.navigate('FullDeliveryHistory');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={shopkeeper.profilePicture} style={styles.profilePicture} />
        <Text style={styles.name}>{user?.nome_loja}</Text>
        {/* <Text style={styles.storeName}>{shopkeeper.storeName}</Text> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{shopkeeper.email}</Text>
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.info}>{user?.telefone}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados da Empresa</Text>
        <Text style={styles.label}>CNPJ</Text>
        <Text style={styles.details}>{user?.cnpj}</Text>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.details}>{user?.endereco}</Text>
        <Text style={styles.label}>Conta Bancária</Text>
        <Text style={styles.details}>{user?.conta_bancaria}</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button
          title="Editar perfil"
          //onPress={handleEditProfile}
          buttonStyle={{ 
            backgroundColor: 'rgba(127, 220, 103, 1)',
            borderRadius: 10  
          }}
          containerStyle={{
            height: 40,
            width: '90%',
            marginHorizontal: 10,
            //marginVertical: 0,


          }}
          titleStyle={{
            color: 'white',
            marginHorizontal: 20,
          }}
        />
        <Button
          title="Sair"
          onPress={handleLogOut}
          buttonStyle={{ 
            backgroundColor: 'rgba(127, 220, 103, 1)',
            borderRadius: 10 }}
          
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


      {/* <View style={styles.deliveryHistory}>
        <Text style={styles.sectionTitle}>Histórico de Entregas</Text>
        <Text style={styles.historyDetails}>Número de Entregas Realizadas: {shopkeeper.deliveries}</Text>
        <Text style={styles.historyDetails}>Total Gasto: {shopkeeper.totalSpent}</Text>
        <TouchableOpacity onPress={handleViewFullHistory}>
          <Text style={styles.link}>Ver Histórico Completo</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#ececec',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#001636',
  },
  storeName: {
    fontSize: 18,
    marginVertical: 4,
    color: '#4b4b4b',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#001636',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#001636',
  },
  info: {
    fontSize: 16,
    color: '#4b4b4b',
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4b4b4b',
  },
  divider: {
    height: 1,
    backgroundColor: '#dcdcdc',
    marginVertical: 16,
  },
  editButton: {
    marginVertical: 16,
  },
  deliveryHistory: {
    backgroundColor: '#ececec',
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  historyDetails: {
    fontSize: 16,
    color: '#4b4b4b',
    marginTop: 4,
  },
  link: {
    color: '#82d982',
    fontSize: 16,
    marginTop: 8,
  },
  sairButton: {
    marginTop: 23,
    padding: 40
  },
});

export default ShopkeeperProfileScreen;
