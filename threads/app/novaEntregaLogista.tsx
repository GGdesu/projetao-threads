import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function logistaScreen() {
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
                    source={require("../assets/images/iconePerfil.png")}
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
                    //labelStyle={styles.inputTexto}
                />
                <Input
                    placeholder="Tempo máximo para entrega"
                    containerStyle={styles.inputContainer}
                    //inputStyle={}
                    label="Tempo máximo para entrega"
                    //labelStyle={styles.inputTexto}
                />
                <Input
                    placeholder="Informe o endereço de entrega"
                    inputStyle={(styles.inputTexto, { height: 90 })}
                    containerStyle={styles.inputContainer}
                    label="Endereço de entrega"
                    //labelStyle={styles.inputTexto}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button
                            title={"Solicitar corrida"}
                            buttonStyle={styles.smallButton}
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
});
