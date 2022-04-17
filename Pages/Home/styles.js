import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#F2F1F6",
  },
  swipeContainer: {
    flexDirection: "row",
  },

  listContainer: {
    borderWidth: 0,
    color: "white",
    // flex: 3,
  },

  listItem: {
    borderBottomWidth: 0,
    color: "white",
    padding: 10,
    textAlign: "right",
  },

  rightAction: {
    backgroundColor: "blue",
    width: 150,
  },
  textAction: {
    color: "black",
  },
  editInput: {
    textAlign: "right",
    alignItems: "flex-end",
    width: 150,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    color: "gray",
    backgroundColor: "white",
  },

  personIcon: {
    color: "black",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 20,
    marginTop: 20,
  },

  completed: {
    fontWeight: "bold",
    backgroundColor: "#656565",
    padding: 5,
    color: "white",
    flexDirection: "row",
    alignSelf: "stretch",
  },

  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#39A5B0",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 75,
    marginVertical: 30,
    alignSelf: "center",
  },

  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  date: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
export default styles;
