import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { supabase } from "@/utils/supabase";


export default function cadastroScreen() {
  const [value, setValue] = useState('')
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const comparePassword = (text: string) => {
    if (password != text) {
      setPasswordError('A senha não está igual')
    } else {
      setPasswordError('')
    }
  }

  async function signUpWithEmail() {
    setLoading(true)

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Por favor, Cheque sua caixa de entrada no email, para verificação.")
    setLoading(false)
  }

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
          autoCapitalize={'none'}
        />
        <Input
          placeholder='Insira uma senha'
          inputStyle={styles.inputLabel}
          onChangeText={validatePassword}
          errorMessage={passwordError}
          label='Criar Senha'
          labelStyle={styles.labelForm}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
        <Input
          placeholder='Insira a senha novamente'
          inputStyle={styles.inputLabel}
          onChangeText={comparePassword}
          errorMessage={passwordError}
          label='Repetir a senha'
          labelStyle={styles.labelForm}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />

        <Button title={'Cadastrar como Lojista'}
          disabled={loading}
          onPress={() => signUpWithEmail()}
          titleStyle={styles.titleLojista}
          buttonStyle={{ backgroundColor: '#808080', borderRadius: 5 }}
          containerStyle={styles.containerForm} />
        <Button title={'Cadastrar como Entregador'}
          disabled={loading}
          onPress={() => signUpWithEmail()}
          titleStyle={styles.titleEntregador}
          buttonStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
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
