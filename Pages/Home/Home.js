import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
} from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import TaskItem from "./TaskItem";
import { Swipeable } from "react-native-gesture-handler";
import styles from "./styles";
import FloatingInput from "../../Components/FloatingInput/FloatingInput";

const Home = (props) => {
  const [newToDo, setNewToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [completedToDos, setCompletedToDos] = useState([]);
  const [completeToDo, setCompleteToDo] = useState(false);
  const [point, setPoint] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [allToDos, setAllToDos] = useState(0);
  const [show, setShow] = useState(false);

  const inputRef = useRef();

  const db = getDatabase();
  const toDoListRef = ref(db, "toDoList/" + props.userId);
  //go to this userId
  const reference = ref(db, "profiles/" + props.userId);
  const newToDoRef = push(toDoListRef);
  //add new to do to end of toDoListRef
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear(); //Current Year
    setCurrentDate(day[today] + ", " + month + "/" + date + "/" + year);
  }, []);

  const onAdd = () => {
    if (newToDo !== "") {
      set(newToDoRef, {
        id: newToDoRef.key,
        todo: newToDo,
        complete: completeToDo,
        point: point,
      }).catch((err) => console.log(err));
      setNewToDo("");
      setShow(!show);
    } else {
      setShow(!show);
    }
  };
  //newToDoRef.key gives us the key for that specific to do
  //.catch catches any errors

  useEffect(() => {
    return onValue(toDoListRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        let result = Object.keys(data).map((key) => data[key]);

        let completedToDos = [];
        let incompleteToDos = [];
        let allToDos = [];

        result.map((item) => {
          if (item.complete) {
            completedToDos.push(item);
          } else {
            incompleteToDos.push(item);
          }
          allToDos.push(item.todo);
        });
        setToDos(incompleteToDos);
        setCompletedToDos(completedToDos);
        setAllToDos(allToDos.length);
      } else {
        setToDos([]);
        setCompletedToDos([]);
        setAllToDos(0);
      }
    });
  }, []);

  useEffect(() => {
    update(reference, {
      name: user ? user.providerData[0].displayName : "",
      doneToDos: completedToDos.length,
      totalToDos: allToDos,
      currentScore: 0,
    });
  });

  //Object.keys gets the data out in a way that it can be rendered
  // if else prevents error from null

  const signout = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Auth");
  };
  //signOut is firebase
  // navigation.navigate("Page") - what page to go to in nav stack

  return (
    <View style={styles.container}>
      <View style={styles.personIcon}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="person-circle-outline" size={35} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.8 }}>
        <Text style={styles.date}>Today {currentDate}</Text>
        <FloatingInput
          show={show}
          newToDo={newToDo}
          setNewToDo={setNewToDo}
          inputRef={inputRef}
          onAdd={onAdd}
        />
        <View>
          <View style={styles.listContainer}>
            <FlatList
              data={toDos}
              renderItem={({ item }) => (
                <TaskItem item={item} db={db} userId={props.userId} />
              )}
              //For each item inside todos put it inside TaskItem as a prop
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.completed}> Completed </Text>
            <FlatList
              data={completedToDos}
              renderItem={({ item }) => (
                <TaskItem item={item} db={db} userId={props.userId} />
              )}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setShow(!show);
              inputRef.current.focus();
            }}
          >
            <Text style={styles.submitButton}>Add New </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
