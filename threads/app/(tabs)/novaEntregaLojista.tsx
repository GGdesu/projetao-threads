import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/context/userContext";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";
import HeaderThreads from "@/components/Header";

export default function logistaScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();

    //infos do usuario pegas atraves do context
    const { user } = useUser();

    //inputs do usuario
    const [tempoPreparo, setTempoPreparo] = useState("")
    const [tempoMax, setTempoMax] = useState("")
    const [endereco, setEndereco] = useState("")

    const preco = 5

    const handleEnderecoChange = (text: string) => {
        setEndereco(text);
    };

    const handleTempoPreparoChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTempoPreparo(numericValue);
    };

    const handleTempoMaxChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTempoMax(numericValue);
    };
    
    async function criarEntrega() {
        
        try {
            
            const { error: upsertError } = await supabase
            .from("entrega")
            .upsert({
                lojista_id: user?.lojista_id,
                nome_lojista: user?.nome_loja,
                telefone_lojista: user?.telefone,
                tempo_preparo: tempoPreparo,
                previsao_entrega: "20:25",
                endereco_entrega: endereco,
                situacao_corrida: "ativa",
                preco: preco,


            })

            if (upsertError) {
                Alert.alert('Erro ao salvar informações adicionais:', upsertError.message)
            }else{
                //console.log("entrega criada com sucesso")
                Alert.alert("entrega criada com sucesso")
                //router.push({pathname:""})
            }

        } catch (error) {
            
        }

    }


    return (
        <View style={styles.screenContainer}>
            <HeaderThreads user={user} />
            <View style={styles.formContainer}>
                <Text style={styles.tituloTexto}>Informações da corrida</Text>
                <Input
                    placeholder="Tempo de preparo do produto em minuto"
                    containerStyle={styles.inputContainer}
                    label="Tempo de preparo"
                    onChangeText={handleTempoPreparoChange}
                    value={tempoPreparo}
                //labelStyle={styles.inputTexto}
                />                
                <Input
                    placeholder="Informe o endereço de entrega"
                    inputStyle={(styles.inputTexto, { height: 90 })}
                    containerStyle={styles.inputContainer}
                    label="Endereço de entrega"
                    onChangeText={handleEnderecoChange}
                    value={endereco}
                //labelStyle={styles.inputTexto}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button
                            title={"Solicitar corrida"}
                            buttonStyle={styles.smallButton}
                            onPress={criarEntrega}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 10,
    },
    img: {
        width: 100,
        height: 100,
        marginRight: 25,
        marginLeft: 20,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#e6e6e6",
        paddingVertical: 35,
        paddingHorizontal: 10,
        borderRadius: 0,
    },
    formContainer: {
        //paddingHorizontal: 10,
        width: "95%",
    },
    inputContainer: {
        marginTop: 20,
        width: "100%",
    },
    perfilTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        //textAlign: "left",
    },
    tituloTexto: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: "bold",
    },
    inputTexto: {
        color: "808080",
        fontSize: 16,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
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
        width: "95%", // Define a largura do contêiner do botão como 80% da tela
    },
});
