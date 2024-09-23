import { ScrollView, Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { formatCep, formatDate, formatPhoneNumber } from "@/utils/mask";
import { Address } from "@/utils/dataInterface";
import { getAddressByCep } from "@/utils/viaCep";


export default function cadastroScreen() {

  const router = useRouter()
  const { email, password } = useLocalSearchParams();
  //const [loading, setLoading] = useState(false)

  //inputs do usuario
  const [nome, setNome] = useState("")
  const [rg, setRg] = useState("")
  const [telefone, setTelefone] = useState("")
  const [endereco, setEndereco] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [cnh, setCnh] = useState("")
  const [contaBancaria, setContaBancaria] = useState("")
  const [veiculo, setVeiculo] = useState("")
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");

  // Certificar de que o email e a senha sejam strings
  const emailString = Array.isArray(email) ? email[0] : email;
  const passwordString = Array.isArray(password) ? password[0] : password;

  const handleNomeChange = (text: string) => {
    setNome(text);
  };

  const handleVeiculoChange = (text: string) => {
    setVeiculo(text);
  };

  const handleRgChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setRg(numericValue);
  };

  const handleCnhChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCnh(numericValue);
  };

  const handleEnderecoChange = (text: string) => {
    setEndereco(text);
  };

  const handleDataNascimentoChange = (text: string) => {
    setDataNascimento(text);
  };

  const handleTelefoneChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTelefone(numericValue);
  };

  const handleContaBancariaChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setContaBancaria(numericValue);
  };

  const handleAddress = async () => {
      console.log("consultando cep...");
      const numericValue = cep.replace(/[^0-9]/g, '');
      const data: Address = await getAddressByCep(numericValue);

      if (!data.logradouro || !data.bairro || !data.localidade) {
        setEndereco("");
      } else {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade}`);
      }
  };

  async function signUpWithEmail() {

    try {
      //setLoading(true)
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signUp({
        email: emailString,
        password: passwordString,
      })

      if (error) {
        Alert.alert(error.message)
        return
      }

      // Se o cadastro foi bem-sucedido, salvar as informações adicionais
      const { error: insertError } = await supabase
        .from('usuario')
        .insert([
          {
            entregador_id: user?.id,
            tipo_usuario: 2,
            rg: parseInt(rg),
            data_nascimento: dataNascimento,
            nome: nome,
            cnh: parseInt(cnh),
            endereco: endereco,
            telefone: parseInt(telefone),
            conta_bancaria: parseInt(contaBancaria),
            veiculo: veiculo
          }
        ])

      if (insertError) {
        Alert.alert('Erro ao salvar informações adicionais:', insertError.message)
      } else {
        Alert.alert("informaçoes salvas, por favor faça login")
        router.navigate("/login")
      }

      if (!session) {
        Alert.alert("Por favor, Cheque sua caixa de entrada no email, para verificação.")
        //setLoading(false)
        //router.navigate("/login")
      }


    } catch (err) {
      console.error('Erro inesperado:', err);
    }

  }

  // async function signUpWithEmail() {
  //   //setLoading(true)

  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: emailString,
  //     password: passwordString,
  //   })

  //   if (error) Alert.alert(error.message)
  //   if (!session) Alert.alert("Por favor, Cheque sua caixa de entrada no email, para verificação.")
  //   //setLoading(false)
  // }

  return (
    <View>
        <Text style={styles.cadastroTexto}> Cadastro Entregador </Text>
        <Text style={styles.informe}>Informe os seus dados {'\n'}para prosseguir com o cadastro</Text>
      <ScrollView style= {{maxHeight: 650}} contentContainerStyle={styles.scrollView}>
        <View style={styles.campoForm}>
          <Input
            placeholder='Informe seu nome completo'
            inputStyle={styles.inputLabel}
            label='Nome'
            labelStyle={styles.labelForm}
            onChangeText={handleNomeChange}
            value={nome}
          />
          <Input
            placeholder='Informe seu RG'
            inputStyle={styles.inputLabel}
            keyboardType="numeric"

            label='RG'
            labelStyle={styles.labelForm}
            onChangeText={handleRgChange}
            value={rg}
          />
          <View style={styles.containerHorizontal}>
              <Input
                  label="Cep"
                  labelStyle={styles.labelForm}
                  placeholder="50.000-000"
                  inputStyle={[styles.inputLabel, { width: "40%" }]}
                  containerStyle={
                      (styles.inputContainer, { width: "50%" })
                  }
                  onChangeText={setCep}
                  onBlur={handleAddress}
                  maxLength={10}
                  value={formatCep(cep)}
                  keyboardType="numeric"
              />
              <Input
                  placeholder=""
                  labelStyle={styles.labelForm}
                  inputStyle={[styles.inputLabel, { width: "40%" }]}
                  containerStyle={
                      (styles.inputContainer, { width: "50%" })
                  }
                  label="Número"
                  maxLength={5}
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType="numeric" // Define o teclado numérico
              />
          </View>
          <Input
              labelStyle={styles.labelForm}
              placeholder="Rua, Bairro, Cidade"
              inputStyle={[styles.inputLabel, { width: "40%" }]}
              containerStyle={
                  (styles.inputContainer)
              }
              value={endereco}
              label="Endereço"
              readOnly
          />
          <Input
            placeholder='01/01/1990'
            inputStyle={styles.inputLabel}
            label='Data de Nascimento'
            labelStyle={styles.labelForm}
            onChangeText={handleDataNascimentoChange}
            maxLength={10}
            value={formatDate(dataNascimento)}
          />
          <Input
            placeholder='Informe seu Telefone'
            inputStyle={styles.inputLabel}
            keyboardType="numeric"
            label='Telefone'
            labelStyle={styles.labelForm}
            onChangeText={handleTelefoneChange}
            maxLength={15}
            value={formatPhoneNumber(telefone)}
          />
          <Input
            placeholder='Informe sua CNH'
            inputStyle={styles.inputLabel}
            label='CNH'
            labelStyle={styles.labelForm}
            onChangeText={handleCnhChange}
            value={cnh}
          />
          <Input
            placeholder='Informe sua Conta Bancaria'
            inputStyle={styles.inputLabel}
            label='Conta Bancária'
            labelStyle={styles.labelForm}
            onChangeText={handleContaBancariaChange}
            value={contaBancaria}
          />
          <Input
            placeholder='Informe seu Veiculo (moto/bicicleta)'
            inputStyle={styles.inputLabel}
            label='Veículo'
            labelStyle={styles.labelForm}
            onChangeText={handleVeiculoChange}
            value={veiculo}
          />

          <Button
            title={'Finalizar Cadastro'}
            titleStyle={styles.titleEntregador}
            buttonStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
            containerStyle={styles.containerForm}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cadastroTexto: {
    color: "#000",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 70
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
  containerForm: {
    padding: 5,
  },
  titleEntregador: {
    color: '#000',
    fontSize: 16,
    //backgroundColor: Color.colorBlack,

  },
  inputContainer: {
      marginTop: 10,
      width: "100%",
  },
  containerHorizontal: {
      flexDirection: "row",
      //alignItems: "center",
      width: "100%",
      //backgroundColor: "#e6e6e6",
      paddingVertical: 10,
      //paddingHorizontal: 10,
      borderRadius: 0,
  },
})
