import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={require("@/assets/images/react-logo.png")} />
            <Text style={styles.texto}>Threads</Text>
            <Text style={styles.textoNegrito}>Otimizando Suas Entregas</Text>

            <TouchableOpacity
                style={styles.entrarB}
                onPress={() => router.navigate("/login")}
            >
                <Text style={styles.textoEntrar}>Entrar</Text>
            </TouchableOpacity>

            {/* <Link href='/cadastro' asChild>
      <TouchableOpacity style={styles.entrarB} >
        <Text style={styles.textoEntrar}>Entrar</Text>
      </TouchableOpacity>
    </Link> */}

            <TouchableOpacity
                style={styles.cadastroB}
                onPress={() => router.navigate("/cadastro")}
            >
                <Text style={styles.textoCadastro}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    texto: {
        fontSize: 29,
        lineHeight: 33,
        color: "#fff",
        textAlign: "center",
        marginTop: 10,
    },
    textoNegrito: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 33,
        marginBottom: 50,
    },
    entrarB: {
        backgroundColor: "#FFF",
        width: "70%",
        height: 41,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        borderRadius: 5,
    },
    textoEntrar: {
        fontSize: 16,
        //fontFamily: FontFamily.interRegular,
        color: "#000",
        textAlign: "center",
    },
    cadastroB: {
        backgroundColor: "#000",
        width: "70%",
        height: 41,
        justifyContent: "center",
    },
    textoCadastro: {
        fontSize: 16,
        textDecorationLine: "underline",
        //fontFamily: FontFamily.interRegular,
        color: "#808080",
        textAlign: "center",
    },
});
