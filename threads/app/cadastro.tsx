import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";


export default function cadastroScreen() {
  const [value, setValue] = useState('')
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '')
    setValue(numericValue)
  }

  // Função de validação de email
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  // Função de validação de senha
  const validatePassword = (text: string) => {
    setPassword(text);

    // Verifica se a senha atende aos critérios
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!passwordRegex.test(text)) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um símbolo.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/react-logo.png')} />
      <Text style={styles.cadastroTexto}> Cadastro </Text>
      <Text style={styles.informe}>Informe os seus dados {'\n'}para prosseguir com o cadastro</Text>
      <View style={styles.campoForm}>
        <Input
          placeholder='Informe seu nome completo'
          inputStyle={styles.inputLabel}
          label='Nome'
          labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Seu número com DDD'
          inputStyle={styles.inputLabel}
          keyboardType="numeric"
          onChangeText={handleInputChange}
          label='Telefone'
          labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe o email aqui'
          inputStyle={styles.inputLabel}
          label='Email'
          labelStyle={styles.labelForm}
          onChangeText={validateEmail}
          errorMessage={emailError}
        />
        <Input
          placeholder='Insira uma senha'
          inputStyle={styles.inputLabel}
          onChangeText={validatePassword}
          errorMessage={passwordError}
          label='Criar Senha'
          labelStyle={styles.labelForm}
          secureTextEntry={true}
        />
        <Input
          placeholder='Insira a senha novamente'
          inputStyle={styles.inputLabel}
          onChangeText={validatePassword}
          errorMessage={passwordError}
          label='Repetir a senha'
          labelStyle={styles.labelForm}
          secureTextEntry={true}
        />

        <Button title={'Cadastrar como Lojista'} titleStyle={styles.titleLojista} buttonStyle={{ backgroundColor: '#808080', borderRadius: 5 }} containerStyle={styles.containerForm} />
        <Button title={'Cadastrar como Entregador'} titleStyle={styles.titleEntregador} buttonStyle={{ backgroundColor: '#fff', borderRadius: 5 }} containerStyle={styles.containerForm} />
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
  cadastroTexto: {
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
