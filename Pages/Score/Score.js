import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Score = (props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [allProfiles, setAllProfiles] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");

  const db = getDatabase();
  //get database to db
  const reference = ref(db, "profiles/" + props.userId);
  //setting word reference to mean "go to this pathway (db > profiles > userId)"
  const allProfilesRef = ref(db, "profiles/");

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        const totalpoints = snapshot.val().doneToDos;
        setTotalPoints(totalpoints);
      }
    });
  }, []);

  //when we get value go to your reference pathway and take a snapshot
  //if snapshot value has something there, assign value to totalpoints
  //setTotalPoints to totalpoints

  useEffect(() => {
    onValue(allProfilesRef, (snapshot) => {
      const data = snapshot.val();
      let result = Object.keys(data)
        .map((key) => data[key])
        .sort((a, b) => b.doneToDos - a.doneToDos);

      setAllProfiles(result);
      setHighScore(result[0].doneToDos);
      setFirstPlace(result[0].name);
      setSecondPlace(result[1].name ? result[1].name : "");
      setThirdPlace(result[2].name ? result[2].name : "");
    });
  }, []);

  //go to all profile ref, look for some values and take a snapshot
  //because it is an array - map through the values and pull out only the currentScore values
  //sort current score and set high score from first result in current score

  return (
    <View style={styles.container}>
      <View style={styles.personIcon}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="person-circle-outline" size={35} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Scoreboard</Text>
      <View style={styles.scoreMenu}>
        <Text style={(styles.scoreMenuText, styles.activeText)}>Record</Text>
        <Text style={styles.scoreMenuText}>Week</Text>
        <Text style={styles.scoreMenuText}>Month</Text>
      </View>
      <View style={styles.top3Trophies}>
        <FontAwesome5
          name="trophy"
          size={50}
          color="#B0B0B0"
          style={styles.trophies}
        />
        <FontAwesome5
          name="trophy"
          size={62}
          color="#F2BC70"
          style={styles.firstPlace}
        />
        <FontAwesome5
          name="trophy"
          size={50}
          color="#E37358"
          style={styles.trophies}
        />
      </View>
      <View style={styles.trophyText}>
        <Text style={styles.top3Text}>
          {"\n"}2nd{"\n"}
          {secondPlace}
        </Text>
        <Text style={[styles.top3Text, styles.firstText]}>
          {"\n"}1st{"\n"}
          {firstPlace}
        </Text>
        <Text style={styles.top3Text}>
          {"\n"}3rd{"\n"}
          {thirdPlace}
        </Text>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={allProfiles}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.scoreList}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={[styles.rankText, styles.rankName]}>
                {item.name}
              </Text>
              <Text style={[styles.rankText, styles.score]}>
                {item.doneToDos}/{item.totalToDos}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Score;
