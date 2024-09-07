import { useUser } from "@/context/userContext";
import { Tabs } from "expo-router";
import { title } from "process";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


export default function TabLayout() {

    const { user } = useUser()

    return (
        <Tabs screenOptions={{
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
            headerShown: false,
        }}>
            <Tabs.Screen
                name="andamento"
                options={{
                    title: "Home",
                    href: null
                }}
            />
            
            {/* condicional que mostra a tab bar para o lojista, caso o usuario seja o lojista */}
            {user?.tipo_usuario === 1 ? (
                <Tabs.Screen
                    name="novaEntregaLojista"
                    options={{
                        title: "Nova Entrega",
                        tabBarIcon: ({ color }) => < Icon name="package-variant-closed" size={28} color={color} />
                    }}
                />
            ) : (
                <Tabs.Screen
                    name="novaEntregaLojista"
                    options={{
                        title: "Nova Entrega",
                        tabBarIcon: ({ color }) => < Icon name="package-variant-closed" size={28} color={color} />,
                        href: null
                    }}
                />
            )}
            

            {/* condicional que mostra a tab bar para o entregador, caso o usuario seja o entregador */}
            {user?.tipo_usuario === 2 ? (
                <Tabs.Screen
                    name="entregasAtivas"
                    options={{
                        title: "Corridas ativas",
                        tabBarIcon: ({ color }) => < Icon name="package-variant-closed" size={28} color={color} />
                    }}
                />
            ) : (
                <Tabs.Screen
                    name="entregasAtivas"
                    options={{
                        title: "Corridas ativas",
                        tabBarIcon: ({ color }) => < Icon name="package-variant-closed" size={28} color={color} />,
                        href: null
                    }}
                />
            )}

            <Tabs.Screen
                name="index"
                options={{
                    title: "Andamento",
                    tabBarIcon: ({ color }) => < Icon name="bike" size={28} color={color} />
                }}
            />

            {/* condicional que mostra a tab bar para o lojista, caso o usuario seja o lojista */}
            {user?.tipo_usuario === 1 ? (
                <Tabs.Screen
                    name="historicoLojista"
                    options={{
                        title: "Historico",
                        tabBarIcon: ({ color }) => < Icon name="history" size={28} color={color} />
                    }}
                />
            ) : (
                <Tabs.Screen
                    name="historicoLojista"
                    options={{
                        title: "Historico",
                        tabBarIcon: ({ color }) => < Icon name="history" size={28} color={color} />,
                        href: null
                    }}
                />
            )}

            {/* condicional que mostra a tab bar para o entregador, caso o usuario seja o entregador */}
            {user?.tipo_usuario === 2 ? (
                <Tabs.Screen
                    name="historicoEntregador"
                    options={{
                        title: "Historico",
                        tabBarIcon: ({ color }) => < Icon name="history" size={28} color={color} />
                    }}
                />
            ) : (
                <Tabs.Screen
                    name="historicoEntregador"
                    options={{
                        title: "Historico",
                        tabBarIcon: ({ color }) => < Icon name="history" size={28} color={color} />,
                        href: null
                    }}
                />
            )}
        </Tabs>
    )
}