import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1F6",
  },
  personIcon: {
    color: "black",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: "Assistant_700Bold",
  },
  scoreMenu: {
    borderRadius: 20,
    backgroundColor: "#BB4976",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 50,
    paddingHorizontal: 5,
    paddingRight: 40,
  },
  scoreMenuText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Assistant_400Regular",
  },
  activeText: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    color: "#BB4976",
    padding: 3,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  top3Trophies: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  trophyText: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontFamily: "Assistant_700Bold",
  },
  top3Text: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontFamily: "Assistant_700Bold",
    marginTop: -15,
  },
  firstText: {
    fontSize: 24,
    marginTop: -45,
  },
  trophies: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 20,
    textAlign: "center",
    alignItems: "center",
  },
  firstPlace: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    marginTop: -25,
    paddingTop: 15,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 50,
  },
  scoreList: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "white",
    height: 72,
    marginBottom: 54,
    justifyContent: "space-evenly",
  },
  rank: {
    borderColor: "#d3d3d3",
    borderWidth: 4,
    borderRadius: 8,
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 48,
    width: 48,
    textAlign: "center",
    fontSize: 16,
    paddingTop: 10,
    fontFamily: "Inter-SemiBold",
  },
  rankText: {
    color: "#a9a9a9",
    fontSize: 16,
    fontFamily: "Assistant_400Regular",
    fontSize: 24,
    alignSelf: "center",
  },
  rankName: {
    marginRight: "45%",
  },
  score: {
    marginRight: 50,
  },
});

export default styles;