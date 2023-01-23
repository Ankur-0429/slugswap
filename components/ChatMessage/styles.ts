import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 2,
    },
    messageBox: {
        padding: 10,
    },
    name: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
});

export default styles;