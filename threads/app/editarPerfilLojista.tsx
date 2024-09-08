import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function PerfilLogistaScreen() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const handleInputChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        setValue(numericValue);
    };

    return (
        <View>
            <View style={styles.screenContainer}>
                <Text style={styles.text}>Meu perfil</Text>
                <Image
                    style={styles.img}
                    source={require("../assets/images/iconePerfil.png")}
                />
                <Text style={{ fontSize: 9, color: "#b3b3b3" }}>Editar foto</Text>
            </View>
            <Text style={styles.perfilTexto}>Editar perfil</Text>
            <View style={styles.dadosContainer}>
                <Text style={styles.text}>Dados do responsável</Text>
                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Nome</Text>
                    <Input
                        placeholder="Jhon Doe"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                    />
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Telefone</Text>
                    <Input
                        placeholder="(81) 99999-9999"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                    />
                </View>

                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>E-mail</Text>
                    <Input
                        placeholder="email@email.com"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                    />
                </View>
            </View>
            <View style={styles.dadosContainer}>
                <Text style={styles.text}>Dados da empresa</Text>
                <View style={styles.inputPading}>
                    <Text style={styles.labelAboveInput}>Nome fantasia</Text>
                    <Input
                        placeholder="Restaurante ABC"
                        inputStyle={styles.inputLabel}
                        containerStyle={styles.inputContainerStyle} // Aplicando o contorno
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title={"Salvar alterações"}
                        buttonStyle={styles.smallButton}
                    />
                </View>
            </View>
        </View>
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
});
