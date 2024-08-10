import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";


export default function cadastroScreen() {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '')
    setValue(numericValue)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.cadastroTexto}> Cadastro Entregador </Text>
      <Text style={styles.informe}>Informe os seus dados {'\n'}para prosseguir com o cadastro</Text>    
      <View style={styles.campoForm}>
        <Input
          placeholder='Informe seu nome completo' inputStyle={styles.inputLabel} label='Nome' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe seu RG' inputStyle={styles.inputLabel} keyboardType="numeric" onChangeText={handleInputChange} label='RG' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe seu Endereço' inputStyle={styles.inputLabel} label='Endereço' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe sua Data de Nascimento' inputStyle={styles.inputLabel} label='Data de Nascimento' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe seu Telefone' inputStyle={styles.inputLabel} keyboardType="numeric" onChangeText={handleInputChange} label='Telefone' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe sua CNH' inputStyle={styles.inputLabel} label='CNH' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe sua Conta Bancaria' inputStyle={styles.inputLabel} label='Conta Bancária' labelStyle={styles.labelForm}
        />
        <Input
          placeholder='Informe seu Veiculo (moto/bicicleta)' inputStyle={styles.inputLabel} label='Veículo' labelStyle={styles.labelForm}
        />
        
        <Button title={'Finalizar Cadastro'} titleStyle={styles.titleEntregador} buttonStyle={{ backgroundColor: '#fff', borderRadius: 5}} containerStyle={styles.containerForm} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },  
  cadastroTexto: {
    color: "#000",
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
  containerForm: {
    padding: 5,
  },
  titleEntregador: {
    color: '#000',
    fontSize: 16,
    //backgroundColor: Color.colorBlack,

  },
})
