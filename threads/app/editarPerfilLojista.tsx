import { ScrollView, Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/context/userContext";
import { formatCnpj } from "@/utils/mask";
import { supabase } from "@/utils/supabase";


export default function PerfilLogistaScreen() {
    const router = useRouter();

    const { user, setUser } = useUser();

    //inputs do usuario
    const [nomeLoja, setNomeLoja] = useState(user?.nome_loja || "")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState(user?.endereco || "")
    const [telefone, setTelefone] = useState("")
    const [contaBancaria, setContaBancaria] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

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

    async function updateProfileLojista() {

        try {

            // Se o cadastro foi bem-sucedido, salvar as informações adicionais
            const { data: userUpdate , error: insertError } = await supabase
                .from('usuario')
                .update([
                    {
                        nome_loja: nomeLoja,
                        cnpj: parseInt(cnpj) || user?.cnpj,
                        endereco: endereco,
                        telefone: parseInt(telefone) || user?.telefone,
                        conta_bancaria: parseInt(contaBancaria) || user?.conta_bancaria,
                        rua: rua || user?.rua,
                        numero: numero || user?.numero,
                        bairro: bairro || user?.bairro,
                        cidade: cidade || user?.cidade,
                    }
                ])
                .eq("lojista_id", user?.lojista_id)
                .select()


            if (insertError) {
                Alert.alert('Erro ao salvar informações adicionais:', insertError.message)
            }else{
                Alert.alert("informaçoes atualizadas")
                //console.log("usuario atualizado: ", userUpdate[0])
                setUser(userUpdate[0])
                router.navigate("/perfilLojista")
            }



        } catch (err) {
            console.error('Erro inesperado:', err);
        }

    }


    return (
        <ScrollView>
            <View style={styles.dadosContainer}>
                <Text style={styles.text}>Dados da Empresa</Text>
                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Nome do Restaurante</Text>
                    <Input
                        placeholder={user?.nome_loja ? user.nome_loja : "nome do restaurante"}
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                        onChangeText={handleNomeLojaChange}
                        value={nomeLoja}
                    />
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Telefone</Text>
                    <Input
                        placeholder="(81) 99999-9999"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                        keyboardType="numeric"
                        onChangeText={handleTelefoneChange}
                        value={telefone}

                    />
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>CNPJ</Text>
                    <Input
                        placeholder="xx.xxx.xxx/xxxx-xx"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                        onChangeText={handleCnpjChange}
                        maxLength={18}
                        value={formatCnpj(cnpj)}
                    />
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Endereço</Text>
                    <View style={styles.containerHorizontal}>
                        <Input
                            placeholder="Informe o nome da rua"
                            inputStyle={(styles.inputTexto, { width: "40%" })}
                            containerStyle={
                                (styles.inputContainer, { width: "50%" })
                            }
                            value={rua}
                            onChangeText={setRua}
                            label="Nome da rua"
                        />
                        <Input
                            placeholder="Informe o numero da casa"
                            inputStyle={(styles.inputTexto, { width: "40%" })}
                            containerStyle={
                                (styles.inputContainer, { width: "50%" })
                            }
                            label="Numero"
                            value={numero}
                            onChangeText={setNumero}
                        />
                    </View>
                    <View style={styles.containerHorizontal}>
                        <Input
                            placeholder="Informe o nome do bairro"
                            inputStyle={(styles.inputTexto, { width: "40%" })}
                            containerStyle={
                                (styles.inputContainer, { width: "50%" })
                            }
                            label="Bairro"
                            value={bairro}
                            onChangeText={setBairro}
                        />
                        <Input
                            placeholder="Informe o nome da cidade"
                            inputStyle={styles.inputTexto}
                            containerStyle={
                                (styles.inputContainer, { width: "50%" })
                            }
                            label="Cidade"
                            value={cidade}
                            onChangeText={setCidade}
                        />
                    </View>
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Conta bancaria</Text>
                    <Input
                        placeholder="xxxxx-x"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                        onChangeText={handleContaBancariaChange}
                        value={contaBancaria}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title={"Salvar alterações"}
                        buttonStyle={styles.smallButton}
                        onPress={updateProfileLojista}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dadosContainer: {
        backgroundColor: "#FFFFFF",
        paddingTop: 20
    },
    screenContainer: {
        flex: 1,
        padding: 30,
        alignItems: "center", // Centraliza horizontalmente
    },
    img: {
        width: 100,
        height: 100,
        marginBottom: 5, // Espaço entre a imagem e o texto
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10
    },
    perfilTexto: {
        textAlign: "right",
        fontSize: 13,
        marginRight: 32,
        color: "#b3b3b3"
    },
    inputPading: {
        padding: 5
    },
    inputContainerStyle: {
        borderColor: "#b3b3b3", // Cor do contorno
        borderWidth: 1, // Largura do contorno
        borderRadius: 5 // Cantos arredondados
    },
    labelAboveInput: {
        fontSize: 16,
        color: "#b3b3b3",
        marginBottom: 5 // Espaço entre a label e o input
    },
    inputLabel: {
        lineHeight: 16,
        textAlign: "left",
        color: "#b3b3b3",
    },
    smallButton: {
        backgroundColor: "#000000",
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    buttonWrapper: {
        width: "90%", // Define a largura do contêiner do botão como 80% da tela
    },
    inputTexto: {
        color: "808080",
        fontSize: 16,
    },
    inputContainer: {
        marginTop: 20,
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
