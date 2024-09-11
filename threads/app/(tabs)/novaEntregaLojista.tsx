import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, color, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "react-native-screens";
import { supabase } from "@/utils/supabase";
import { useUser } from "@/context/userContext";
import { Alert } from "react-native";
import HeaderThreads from "@/components/Header";
import { error } from "console";

interface Coordinates {
    lat: number;
    lon: number;
}

const getCoordinates = async (address: string): Promise<Coordinates> => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );    
    const data = await response.json();
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
};

const calculateDistance = (
    coord1: Coordinates,
    coord2: Coordinates
): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lon - coord1.lon) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1.lat * (Math.PI / 180)) *
            Math.cos(coord2.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
};


const calcularTempoDeEntrega = (
    distancia: number,
    tempoDePreparo: string,
    velocidadeMedia: number = 30
): number => {
    let tempoDePreparoNum: number = 0;

    if (tempoDePreparo !== null) {
        tempoDePreparoNum = parseFloat(tempoDePreparo);
    }

    const tempoEntregaHoras = distancia / velocidadeMedia;
    const tempoEntregaMinutos = tempoEntregaHoras * 60;

    return tempoDePreparoNum + tempoEntregaMinutos;
};

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
    const [distance, setDistance] = useState<number | null>(null);
    const [tempoDePreparo, setTempoDePreparo] = useState("0");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    const router = useRouter();

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
                Alert.alert("entrega criada com sucesso");
                //router.push({pathname:""})
            }
        } catch (error) {}
    }

    // const enviarDadosParaSupabase = async () => {
    //     try {
    //         const { data, error } = await supabase
    //             .from("corridas") // Nome da tabela
    //             .insert([
    //                 {
    //                     rua,
    //                     numero,
    //                     bairro,
    //                     cidade,
    //                     coleta,
    //                     distancia: distance,
    //                     tempo_preparo: tempoDePreparo,
    //                     horario_entrega: calcularHorarioEntrega(
    //                         calcularTempoDeEntrega(distance!, tempoDePreparo)
    //                     ),
    //                 },
    //             ]);

    //         if (error) {
    //             console.error("Erro ao enviar dados:", error);
    //         } else {
    //             console.log("Dados enviados com sucesso:", data);
    //         }
    //     } catch (err) {
    //         console.error("Erro ao conectar ao Supabase:", err);
    //     }
    // };

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
            const tempoColeta = agora.setMinutes(
                agora.getMinutes() + parseInt(tempoDePreparo)
            );
            const horas = agora.getHours().toString().padStart(2, "0");
            const minutos = agora.getMinutes().toString().padStart(2, "0");
            setColeta(`${horas}:${minutos}`);

            if (distance == null) {
                throw new Error("Distância não pôde ser calculada, Endereço errado !");
            }

            // Após calcular a distância, envia os dados para o Supabase
            await enviarDadosParaSupabase();

            // setErrorMesage(`valor da entrega: ${calcularValorDaEntrega()}
            //  previsão de entrega: ${calcularHorarioEntrega(
            //     calcularTempoDeEntrega(distance!, tempoDePreparo))}
            //      distancia: ${distance}
            //       distancia com !: ${distance}
            //       endereço: ${user?.rua}, ${user?.numero}, ${user?.bairro}, ${user?.cidade}`);

            setBairro("");
            setCidade("");
            //setErrorMesage("");
            setNumero("");
            setRua("");
        } catch (error) {
            setErrorMesage(" ERRO AO FAZER A ENTREGA");
        }
    };

    const handleNumeroChange = (text: string) => {
        // Remove qualquer caractere que não seja número
        const onlyNumbers = text.replace(/[^0-9]/g, "");
        setNumero(onlyNumbers);
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={require("../../assets/images/iconePerfil.png")}
                />
                <Text style={styles.perfilTexto}>
                    Nome do restaurante {"\n"}Localização
                </Text>
            </View>
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
                        placeholder="Informe o número da casa"
                        inputStyle={(styles.inputTexto, { width: "40%" })}
                        containerStyle={
                            (styles.inputContainer, { width: "50%" })
                        }
                        label="Número"
                        value={numero}
                        onChangeText={handleNumeroChange}
                        keyboardType="numeric" // Define o teclado numérico
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
