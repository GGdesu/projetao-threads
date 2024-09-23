import { Text, View, StyleSheet } from "react-native";
import { Button, Input } from "@rneui/base";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUser } from "@/context/userContext";
import { Alert } from "react-native";
import HeaderThreads from "@/components/Header";
import { formatCep } from "@/utils/mask";
import { Address } from "@/utils/dataInterface";
import { getAddressByCep } from "@/utils/viaCep";
import { calcularTempoDeEntrega, calculateDistance, getCoordinates } from "@/utils/coordinates";

function getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mês de 0-11, então +1
    const day = now.getDate().toString().padStart(2, '0');

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const calcularHorarioEntrega = (tempoTotal: number): string => {
    const agora = new Date();

    agora.setMinutes(agora.getMinutes() + tempoTotal);
    const horas = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");

    return `${horas}:${minutos}`;
};

export default function logistaScreen() {
    //infos do usuario pegas atraves do context
    const [errorMesage, setErrorMesage] = useState("");
    const { user } = useUser();
    const [coleta, setColeta] = useState("");
    const [distance, setDistance] = useState(0);
    const [tempoDePreparo, setTempoDePreparo] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");

    function calcularValorDaEntrega(): number {
        const valorPorKm = 2; // R$ 2,00 por quilômetro
        return distance! * valorPorKm;
    }

    // Função para enviar os dados ao Supabase

    async function enviarDadosParaSupabase() {
        try {
            const { error: upsertError } = await supabase
                .from("entrega")
                .upsert({
                    rua,
                    numero,
                    bairro,
                    cidade,
                    coleta,
                    lojista_id: user?.lojista_id,
                    created_at: getCurrentDateTime(),
                    nome_lojista: user?.nome_loja,
                    telefone_lojista: user?.telefone,
                    tempo_preparo: tempoDePreparo,
                    previsao_entrega: calcularHorarioEntrega(
                        calcularTempoDeEntrega(distance!, tempoDePreparo)
                    ),
                    situacao_corrida: "ativa",
                    preco: calcularValorDaEntrega(),
                });

            if (upsertError) {
                Alert.alert(
                    "Erro ao salvar informações adicionais:",
                    upsertError.message
                );
            } else {
                //console.log("entrega criada com sucesso")
                Alert.alert("Entrega criada com sucesso");
                //router.push({pathname:""})
            }
        } catch (error) { }
    }

    const handleCalculateDistance = async () => {
        try {

            const coord1 = await getCoordinates(
                `${user?.rua}, ${user?.numero}, ${user?.bairro}, ${user?.cidade}, PE`
            );
            console.log("Coord1:", coord1);

            const coord2 = await getCoordinates(
                `${rua}, ${numero}, ${bairro}, ${cidade}, PE`
            );
            console.log("Coord2:", coord2);

            const dist = calculateDistance(coord1, coord2);
            setDistance(dist);

            const agora = new Date();
            const horas = agora.getHours().toString().padStart(2, "0");
            const minutos = agora.getMinutes().toString().padStart(2, "0");
            setColeta(`${horas}:${minutos}`);

            if (distance == 0) {
                throw new Error("Distância não pôde ser calculada, Endereço errado !");
            }

            // Após calcular a distância, envia os dados para o Supabase
            await enviarDadosParaSupabase();

            setBairro("");
            setCidade("");
            setNumero("");
            setRua("");
            setCep("");
            setTempoDePreparo("");

            setErrorMesage("");
        } catch (error) {
            console.log(error);
            setErrorMesage("Erro ao criar entrega. Tente novamente");
        }
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

    return (
        <View style={styles.screenContainer}>
            <HeaderThreads user={user} />
            <View style={styles.formContainer}>
                <Text style={styles.tituloTexto}>Informações da corrida</Text>
                <Input
                    placeholder="Tempo de preparo do produto"
                    containerStyle={styles.inputContainer}
                    label="Tempo de preparo"
                    value={tempoDePreparo}
                    onChangeText={setTempoDePreparo}
                    keyboardType="numeric"
                />
                <View style={styles.containerHorizontal}>
                    <Input
                        label="Cep"
                        placeholder="50.000-000"
                        inputStyle={{ width: "40%" }}
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
                        inputStyle={{ width: "40%" }}
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
                    placeholder="Rua, Bairro, Cidade"
                    inputStyle={{ width: "40%" }}
                    containerStyle={
                        (styles.inputContainer)
                    }
                    value={rua != "" ? `${rua}, ${bairro}, ${cidade}` : ""}
                    onChangeText={setRua}
                    label="Endereço"
                    readOnly
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button
                            title={"Solicitar corrida"}
                            buttonStyle={styles.smallButton}
                            onPress={handleCalculateDistance}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={{ color: "#ff0000" }}>{errorMesage}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: "row",
        //alignItems: "center",
        width: "100%",
        //backgroundColor: "#e6e6e6",
        paddingVertical: 10,
        //paddingHorizontal: 10,
        borderRadius: 0,
    },
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
        textAlign: "left",
        fontSize: 18,
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
    resultText: {
        color: "#000000",
        fontSize: 18,
        marginTop: 20,
        textAlign: "center",
    },
});
