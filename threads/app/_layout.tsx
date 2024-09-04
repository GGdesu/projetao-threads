import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, }} />
        <Stack.Screen name="login" options={{ headerShown: false, }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false, }} />
        <Stack.Screen name="cadastroEntregador" options={{ headerShown: false, }} />
        <Stack.Screen name="cadastroLojista" options={{ headerShown: false, }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>

  );
}