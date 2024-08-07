import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";


export default function LoginScreen() {
  const [value, setValue] = useState('')

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '')
    setValue(numericValue)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/react-logo.png')} />
      <Text style={styles.loginTexto}> Login </Text>
      <View style={styles.campoForm}>
        <Input
          placeholder='Digite seu email' inputStyle={styles.inputLabel} label='Email' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Digite sua senha' inputStyle={styles.inputLabel} label='Senha' labelStyle={styles.labelForm}
        />
        <Button title={'Entrar'} titleStyle={styles.titleLojista} buttonStyle={{ backgroundColor: '#808080', borderRadius: 5 }} containerStyle={styles.containerForm} />
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
