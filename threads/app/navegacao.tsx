import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importando as telas
import NovaEntregaScreen from './(tabs)';
import EmAndamentoScreen from './(tabs)/andamento';
import HistoricoScreen from './(tabs)/historicoLojista';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="NovaEntrega"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'NovaEntrega') {
            iconName = 'package-variant-closed'; // Ícone para Nova Entrega
          } else if (route.name === 'EmAndamento') {
            iconName = 'bike'; // Ícone para Em Andamento representando o entregador em movimento
          } else if (route.name === 'Historico') {
            iconName = 'history'; // Ícone para Histórico
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#001636', // Azul escuro para ícone ativo
        tabBarInactiveTintColor: '#4b4b4b', // Cor dos ícones inativos
        tabBarStyle: {
          backgroundColor: 'white',
          paddingTop: 10, // Aumenta o padding superior
          paddingBottom: 10, // Aumenta o padding inferior
          height: 65, // Ajusta a altura da barra para incluir o padding
          
          shadowColor: '#000', // Cor da sombra
          shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
          shadowOpacity: 0.1, // Opacidade da sombra
          shadowRadius: 3, // Raio de difusão da sombra
          elevation: 5, // Elevação da sombra (para Android)
        },
        tabBarIconStyle: {
          marginBottom: 0, // Mantém o ícone centralizado na barra
        },
        tabBarLabelStyle: {
          fontSize: 10, // Tamanho da fonte do label
          color: 'gray', // Cor cinza para o texto do label
          
        },
        headerShown: false, // Remove o título da tela ativa na parte superior
      })}
    >
      <Tab.Screen
        name="NovaEntrega"
        component={NovaEntregaScreen}
        options={{ title: 'Nova entrega' }}
      />
      <Tab.Screen
        name="EmAndamento"
        component={EmAndamentoScreen}
        options={{ title: 'Em andamento' }}
      />
      <Tab.Screen
        name="Historico"
        component={HistoricoScreen}
        options={{ title: 'Histórico' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
