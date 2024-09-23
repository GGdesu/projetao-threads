import { ScrollView, Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { formatCnpj, formatPhoneNumber, formatCep } from "@/utils/mask";
import { getAddressByCep } from "@/utils/viaCep";
import { Address } from "@/utils/dataInterface";

export default function cadastroScreen() {
    const router = useRouter();
    const { email, password } = useLocalSearchParams();
    //const [loading, setLoading] = useState(false)

    //inputs do usuario
    const [nomeLoja, setNomeLoja] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")
    const [contaBancaria, setContaBancaria] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");

    // Certificar de que o email e a senha sejam strings
    const emailString = Array.isArray(email) ? email[0] : email;
    const passwordString = Array.isArray(password) ? password[0] : password;

    const handleNomeLojaChange = (text: string) => {
        setNomeLoja(text);
    };

    const handleCnpjChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setCnpj(numericValue);
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
            setRua("");
            setBairro("");
            setCidade("");
        } else {
            setRua(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
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
                        lojista_id: user?.id,
                        tipo_usuario: 1,
                        nome_loja: nomeLoja,
                        cnpj: parseInt(cnpj),
                        telefone: parseInt(telefone),
                        conta_bancaria: parseInt(contaBancaria),
                        rua,
                        numero,
                        bairro,
                        cidade,
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
                //router.navigate("/login")
            }
            //setLoading(false)

        } catch (err) {
            console.error('Erro inesperado:', err);
        }

    }

    return (
        <View>
            <Text style={styles.cadastroTexto}> Cadastro Lojista </Text>
            <Text style={styles.informe}>
                Informe os seus dados {"\n"}para prosseguir com o cadastro
            </Text>
            <ScrollView style= {{maxHeight: 650}} contentContainerStyle={styles.scrollView}>
                <View style={styles.campoForm}>
                    <Input
                        placeholder="Informe o nome da loja"
                        inputStyle={styles.inputLabel}
                        label="Nome do estabelecimento"
                        labelStyle={styles.labelForm}
                        onChangeText={handleNomeLojaChange}
                        value={nomeLoja}
                    />
                    <Input
                        placeholder="00.000.000/0000-00"
                        inputStyle={styles.inputLabel}
                        keyboardType="numeric"
                        label="CNPJ"
                        labelStyle={styles.labelForm}
                        onChangeText={handleCnpjChange}
                        maxLength={18}
                        value={formatCnpj(cnpj)}
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
                        value={rua != "" ? `${rua}, ${bairro}, ${cidade}` : ""}
                        onChangeText={setRua}
                        label="Endereço"
                        readOnly
                    />
                    <Input
                        placeholder="Informe seu Telefone"
                        inputStyle={styles.inputLabel}
                        keyboardType="numeric"
                        label="Telefone"
                        labelStyle={styles.labelForm}
                        onChangeText={handleTelefoneChange}
                        maxLength={15}
                        value={formatPhoneNumber(telefone)}
                    />
                    <Input
                        placeholder="Informe sua Conta Bancaria"
                        inputStyle={styles.inputLabel}
                        label="Conta Bancária"
                        labelStyle={styles.labelForm}
                        onChangeText={handleContaBancariaChange}
                        value={contaBancaria}
                    />
                    <Button
                        //disabled={loading}
                        title={"Finalizar Cadastro"}
                        onPress={() => signUpWithEmail()}
                        titleStyle={styles.titleEntregador}
                        buttonStyle={{ backgroundColor: "#fff", borderRadius: 5 }}
                        containerStyle={styles.containerForm}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
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
        color: "#808080",
        textAlign: "center",
        marginBottom: 20,
    },
    campoForm: {
        width: "90%",
        backgroundColor: "#000",
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    labelForm: {
        color: "#b3b3b3",
        textAlign: "left",
        fontSize: 16,
        lineHeight: 22,
        width: "100%",
    },
    inputLabel: {
        lineHeight: 16,
        textAlign: "left",
        color: "#FFFFFF",
    },
    containerForm: {
        padding: 5,
    },
    titleEntregador: {
        color: "#000",
        fontSize: 16,
        //backgroundColor: Color.colorBlack,
    },
    inputTexto: {
        color: "808080",
        fontSize: 16,
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
});
