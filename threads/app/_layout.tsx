import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false,}}/>
      <Stack.Screen name="login" options={{headerShown: false,}}/>
      <Stack.Screen name="cadastro" options={{headerShown: false,}}/>
      <Stack.Screen name="andamentoLojista" options={{headerShown: false,}}/>
      <Stack.Screen name="detalheAndamentoLojista" options={{headerShown: false,}}/>
    </Stack>
  );
}
