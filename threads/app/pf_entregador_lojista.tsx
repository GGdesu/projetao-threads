import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '@/context/userContext';

interface DeliveryHistoryItem {
  id: string;
  date: string;
  rating: number;
  delayTime: number;
  storeName: string;
  dateRange: string;
}

interface Deliverer {
  id: string;
  name: string;
  phone: string;
  rating: number;
  profilePicture: any;
  deliveryHistory: DeliveryHistoryItem[];
}

// Importando a imagem de perfil localmente com caminho relativo
const profilePicture = require('../assets/images/profile.jpg');

const DelivererProfileScreen: React.FC = () => {
  
  const { user } = useUser();
  
  const deliverer: Deliverer = {
    id: '1',
    name: 'João da Silva',
    phone: '(11) 98765-4321',
    rating: 4.5,
    profilePicture: profilePicture,
    deliveryHistory: [
      { id: '1', date: '2024-07-01T22:02:00', rating: 5, delayTime: 0, storeName: 'Padaria do João', dateRange: 'Last Week' },
      { id: '2', date: '2024-06-15T22:02:00', rating: 4, delayTime: 15, storeName: 'Mercado Central', dateRange: 'Last Month' },
      { id: '3', date: '2024-05-20T22:02:00', rating: 3, delayTime: 5, storeName: 'Loja de Roupas', dateRange: 'Last 3 Months' },
      { id: '4', date: '2024-07-02T22:02:00', rating: 5, delayTime: 0, storeName: 'Cafeteria', dateRange: 'Last Week' },
      { id: '5', date: '2024-07-03T22:02:00', rating: 4, delayTime: 10, storeName: 'Restaurante', dateRange: 'Last Week' },
    ],
  };

  const [selectedDateRange, setSelectedDateRange] = useState<string>('All');

  const handleFilterChange = (range: string) => {
    setSelectedDateRange(range);
  };

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

  const renderDeliveryHistoryItem = ({ item }: { item: DeliveryHistoryItem }) => {
    const formattedDate = new Date(item.date).toLocaleString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.historyItem}>
        <Text style={styles.deliveryDate}>{formattedDate}</Text>
        <Text style={styles.text}>Avaliação: {item.rating} {renderStars(item.rating)}</Text>
        <Text style={styles.text}>Tempo de Atraso: {item.delayTime} min</Text>
        <Text style={styles.text}>Estabelecimento: {item.storeName}</Text>
      </View>
    );
  };

  const filteredHistory = selectedDateRange === 'All'
    ? deliverer.deliveryHistory
    : deliverer.deliveryHistory.filter(item => item.dateRange === selectedDateRange);
  
  const totalDeliveries = filteredHistory.length;

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={deliverer.profilePicture} style={styles.profilePicture} />
        <Text style={styles.name}>{user?.nome}</Text>
        <Text style={styles.phone}>Telefone: {user?.telefone}</Text>
        <Text style={styles.ratingText}>{renderStars(deliverer.rating)}</Text>
      </View>
      <View style={styles.filtersContainer}>
        <View style={styles.filterContainer}>
          <Button
            title="Todas"
            onPress={() => handleFilterChange('All')}
            color={selectedDateRange === 'All' ? '#82d982' : '#A9A9A9'}
          />
          <Button
            title="Último Mês"
            onPress={() => handleFilterChange('Last Month')}
            color={selectedDateRange === 'Last Month' ? '#82d982' : '#A9A9A9'}
          />
          <Button
            title="Últimos 3 Meses"
            onPress={() => handleFilterChange('Last 3 Months')}
            color={selectedDateRange === 'Last 3 Months' ? '#82d982' : '#A9A9A9'}
          />
        </View>
        <Text style={styles.totalDeliveries}>Número de Entregas: {totalDeliveries}</Text>
      </View>
      <FlatList
        data={filteredHistory}
        renderItem={renderDeliveryHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.historyList}
      />
    </View>
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
  phone: {
    fontSize: 16,
    marginVertical: 4,
    color: '#4b4b4b',
  },
  ratingText: {
    flexDirection: 'row',
    marginVertical: 4,
    color: '#4b4b4b',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop:8
  },
  totalDeliveries: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001636',
    textAlign: 'left',
    marginTop: 8,
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  deliveryDate: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#4b4b4b',
  },
  text: {
    color: '#4b4b4b',
  },
});

export default DelivererProfileScreen;
