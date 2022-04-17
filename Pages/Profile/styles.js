import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1F6",
    alignItems: "center",
  },
  personIcon: {
    color: "black",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 30,
  },
  infoContainer: {
    width: 350,
    marginTop: 10,
    textAlign: "left",
    backgroundColor: "white",
  },
  input: {
    flexDirection: "row",
    padding: 19,
    borderColor: "#ADB3BC",
    color: "#ADB3BC",
    backgroundColor: "white",
    textAlign: "left",
    width: 350,
    borderBottomWidth: 2,
  },
  myInformation: {
    flexDirection: "row",
    color: "#000000",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 5,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Assistant_400Regular",
    fontWeight: "bold",
    marginBottom: 0,
  },

  changePassword: {
    flexDirection: "row",
    color: "#000000",
    backgroundColor: "white",
    fontFamily: "Assistant_400Regular",
    paddingVertical: 30,
    width: 250,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
  },
  changePasswordContainer: {
    // marginTop: 10,
    marginLeft: 1,
    marginRight: 1,
    padding: 2,
    // borderBottom: 0,
  },

  deleteContainer: {
    flexDirection: "row",
    paddingBottom: 40,
    paddingLeft: 4,
    fontFamily: "Assistant_400Regular",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "white",
  },
});

export default styles;
