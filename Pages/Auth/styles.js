import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPink,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
  header: {
    // fontFamily: Pacifico_400Regular,
    marginTop: 100,
    // fontSize: 96,
    // color: Colors.green,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#EA6D4F",
    margin: 10,
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  buttonText: {
    color: "white",
  },
  input: {
    backgroundColor: "#EEEBDD",
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    padding: 5,
  },
});

export default styles;
