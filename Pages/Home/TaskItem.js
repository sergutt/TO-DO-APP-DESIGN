import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Animated } from "react-native";
import { ref, update, remove, onValue, set } from "firebase/database";
import styles from "./styles";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const TaskItem = ({ item, db, userId }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [changeToDo, setChangeToDo] = useState("");
  const [pointGiven, setPointGiven] = useState(false);
  const [currScore, setCurrScore] = useState(null);
  const toDoListRef = ref(db, "toDoList/" + userId);
  const userPointsRef = ref(db, "profiles/" + userId);
  //curly braces when object - item is flat list
  // passing in props item - deconstructed

  useEffect(() => {
    onValue(userPointsRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const currScore = snapshot.val().currentScore;
        setCurrScore(currScore);
      }
    });
  }, []);

  const handleEdit = (todo, id) => {
    if (toggleEdit) {
      if (changeToDo !== "") {
        updateData(changeToDo, id);

        setToggleEdit(!toggleEdit);
      }
    } else {
      setChangeToDo(todo);

      setToggleEdit(!toggleEdit);
    }
  };
  //handling toggle of editing. Passing in new todo + id of task we want to target

  const updateData = (toDo, id) => {
    const UpdateToDoRef = ref(db, "toDoList/" + userId + "/" + id);

    update(UpdateToDoRef, {
      todo: toDo,
    });
  };
  //updating of data in db. id = specific task id we're ref
  // forward slash to create path when connecting one generated key to another
  // update point to this part and update todo

  const deleteData = (id) => {
    const UpdateToDoRef = ref(db, "toDoList/" + userId + "/" + id);

    remove(UpdateToDoRef);
  };

  const completeTask = (id) => {
    const completeTaskRef = ref(db, "toDoList/" + userId + "/" + id);
    update(completeTaskRef, {
      complete: true,
      pointGiven: true,
    });

    if (!item.pointGiven) {
      if (currScore === null) {
        set(userPointsRef, { doneToDos: 1 });
      } else {
        update(userPointsRef, { doneToDos: currScore + 1 });
      }
    }
  };

  const RightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });

    return (
      <>
        <View style={styles.swipeContainer}>
          <Pressable onPress={() => deleteData(item.id)}>
            <View
              style={{
                flex: 1,
                backgroundColor: "red",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  fontWeight: "600",
                  transform: [{ scale }],
                }}
              >
                Delete
              </Animated.Text>
            </View>
          </Pressable>
        </View>
      </>
    );
  };

  return (
    <View style={styles.listItem}>
      <Swipeable renderRightActions={RightAction}>
        <View style={styles.item}>
          <Pressable onPress={() => completeTask(item.id, item.todo)}>
            <Text>
              {item.complete ? (
                <AntDesign name="checksquareo" size={24} color="black" />
              ) : (
                <Feather name="square" size={24} color="black" />
              )}
            </Text>
          </Pressable>

          {toggleEdit ? (
            <TextInput
              style={styles.editInput}
              value={changeToDo}
              onChangeText={setChangeToDo}
              onBlur={() => handleEdit(item.todo, item.id)}
              editable={item.complete ? false : true}
            />
          ) : (
            <Pressable
              onPress={() => handleEdit(item.todo, item.id)}
              disabled={item.complete ? true : false}
            >
              <Text
                style={{
                  color: item.complete ? "grey" : "black",
                  marginLeft: 10,
                }}
              >
                {item.todo}
              </Text>
            </Pressable>
          )}
        </View>
      </Swipeable>
    </View>
  );
};
//anonymous function binds to the component and doesn't execute until pressed

export default TaskItem;
