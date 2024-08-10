import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { supabase } from "@/utils/supabase";


export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
      setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/react-logo.png')} />
      <Text style={styles.loginTexto}> Login </Text>
      <View style={styles.campoForm}>
        <Input
          placeholder='Digite seu email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          inputStyle={styles.inputLabel}
          label="Email"
          labelStyle={styles.labelForm}
          autoCapitalize="none"
        />
        <Input
          placeholder='Digite sua senha'
          inputStyle={styles.inputLabel}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          label='Senha'
          labelStyle={styles.labelForm}
        />
        <Button title={'Entrar'}
        disabled={loading}
        onPress={() => signInWithEmail()}
        titleStyle={styles.titleLojista} 
        buttonStyle={{ backgroundColor: '#808080', borderRadius: 5 }} 
        containerStyle={styles.containerForm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTexto: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600"
  },
  informe: {
    fontSize: 16,
    color: '#808080',
    textAlign: "center",
    marginBottom: 20
  },
  campoForm: {
    width: "90%",
    backgroundColor: "#000",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  labelForm: {
    color: '#b3b3b3',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 22,
    width: "100%",
  },
  inputLabel: {
    lineHeight: 16,
    textAlign: 'left',
    color: '#b3b3b3',
  },
  titleLojista: {
    fontSize: 16,
    color: '#fff',
  },
  containerForm: {
    padding: 5,
  },
  titleEntregador: {
    color: '#000',
    fontSize: 16,
    //backgroundColor: Color.colorBlack,

  },
})
