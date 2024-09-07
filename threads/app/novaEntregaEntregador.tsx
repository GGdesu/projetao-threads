import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function entregadorScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const handleInputChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setValue(numericValue);
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={require("@/assets/images/iconePerfil.png")}
                />
                <Text style={styles.perfilTexto}>
                    Nome do entregador {"\n"}
                </Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.tituloTexto}> Entregas próximas</Text>
                <View style={styles.localContainer}>
                    <Image
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 15,
                            marginLeft: 20,
                        }}
                        source={require("@/assets/images/star-icon.png")}
                    />
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "bold",
                            paddingVertical: 25,
                        }}
                    >
                        Seu Local:
                    </Text>
                    <Text> Avenida ABC, ABC, 123</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.corridasContainer}>
                        <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                            R$ 7,47
                        </Text>
                        <Text style={{ fontSize: 14, color: "#808080" }}>
                            Restaurante ABC
                        </Text>
                        <View style={{ alignItems: "center", marginRight: 15 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#808080",
                                    paddingTop: 20,
                                }}
                            >
                                A 10 minutos do seu local (1km)
                            </Text>
                            <View style={styles.localContainer}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 5,
                                    }}
                                    //source={require("../assets/images/star-icon.png")}
                                />
                                <Text
                                    style={{ fontSize: 13, fontWeight: "bold" }}
                                >
                                    {"Seu Local: "}
                                </Text>
                                <Text style={{ paddingRight: 10 }}>
                                    Avenida ABC, ABC, 123
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems: "center",
                                paddingVertical: 20,
                            }}
                        >
                            <Text>
                                Coletar em : 20 minutos{"\n"}Entregar em: 30
                                minutos
                            </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "#808080",
                                    paddingTop: 20,
                                }}
                            >
                                A 15 minutos do estabelecimento (4km){" "}
                            </Text>
                            <View style={styles.localContainer}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 5,
                                    }}
                                    source={require("@/assets/images/star-icon.png")}
                                />
                                <Text
                                    style={{ fontSize: 13, fontWeight: "bold" }}
                                >
                                    {"Destino: "}
                                </Text>
                                <Text style={{ paddingRight: 10 }}>
                                    Avenida ABC, ABC, 123
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <View style={styles.localContainer}>
                                <Button
                                    title={"Aceitar"}
                                    buttonStyle={{
                                        width: 90,
                                        height: 40,
                                        marginRight: 35,
                                        backgroundColor: "#08A434",
                                    }}
                                ></Button>
                                <Button
                                    title={"Recusar"}
                                    buttonStyle={{
                                        width: 90,
                                        height: 40,
                                        marginRight: 35,
                                        backgroundColor: "#F95C52",
                                    }}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    localContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        //paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 0,
    },
    corridasContainer: {
        backgroundColor: "#e6e6e6",
        alignItems: "center",
        width: "90%",
        paddingVertical: 35,
        //paddingHorizontal: 10,
        borderRadius: 0,
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
    perfilTexto: {
        textAlign: "left",
        fontSize: 18,
    },
    tituloTexto: {
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollView: {
        flexGrow: 1,
        width: "100%",
        paddingVertical: 35,
        paddingHorizontal: 10,
        borderRadius: 0,
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
