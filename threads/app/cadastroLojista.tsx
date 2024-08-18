import { ScrollView, Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function cadastroScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();
    const { email, password } = useLocalSearchParams();
    //const [loading, setLoading] = useState(false)

    const [nomeLoja, setNomeLoja] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")
    const [contaBancaria, setContaBancaria] = useState("");
    const [rg, setRg] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

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

    const handleEnderecoChange = (text: string) => {
        setEndereco(text);
    };

    const handleTelefoneChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTelefone(numericValue);
    };

    const handleContaBancariaChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setContaBancaria(numericValue);
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
                        user_id: user?.id,
                        nome_loja: nomeLoja,
                        cnpj: parseInt(cnpj),
                        endereco: endereco,
                        telefone: parseInt(telefone),
                        conta_bancaria: parseInt(contaBancaria),
                    }
                ])

            if (insertError) {
                Alert.alert('Erro ao salvar informações adicionais:', insertError.message)
            }else{
                Alert.alert("informaçoes salvas")
            }

            if (!session) {
                Alert.alert("Por favor, Cheque sua caixa de entrada no email, para verificação.")
                router.navigate("/login")
            }
            //setLoading(false)

        } catch (err) {
            console.error('Erro inesperado:', err);
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.cadastroTexto}> Cadastro Lojista </Text>
            <Text style={styles.informe}>
                Informe os seus dados {"\n"}para prosseguir com o cadastro
            </Text>
            <View style={styles.campoForm}>
                <Input
                    placeholder="Informe o nome da loja"
                    inputStyle={styles.inputLabel}
                    label="Nome"
                    labelStyle={styles.labelForm}
                    onChangeText={handleNomeLojaChange}
                    value={nomeLoja}
                />
                <Input
                    placeholder="Informe seu CNPJ"
                    inputStyle={styles.inputLabel}
                    keyboardType="numeric"
                    label="CNPJ"
                    labelStyle={styles.labelForm}
                    onChangeText={handleCnpjChange}
                    value={cnpj}
                />
                <Input
                    placeholder="Informe seu Endereço"
                    inputStyle={styles.inputLabel}
                    label="Endereço"
                    labelStyle={styles.labelForm}
                    onChangeText={handleEnderecoChange}
                    value={endereco}
                />
                <Input
                    placeholder="Informe seu Telefone"
                    inputStyle={styles.inputLabel}
                    keyboardType="numeric"
                    label="Telefone"
                    labelStyle={styles.labelForm}
                    onChangeText={handleTelefoneChange}
                    value={telefone}
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
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cadastroTexto: {
        color: "#000",
        fontSize: 30,
        fontWeight: "600",
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
        color: "#b3b3b3",
    },
    containerForm: {
        padding: 5,
    },
    titleEntregador: {
        color: "#000",
        fontSize: 16,
        //backgroundColor: Color.colorBlack,
    },
});
