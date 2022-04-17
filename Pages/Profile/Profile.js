import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import styles from "./styles";
import EmailModal from "../../constants/EmailModal";
import PassModal from "../../constants/PassModal";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Profile = (props) => {
  const [nameEdit, setNameEdit] = useState(true);
  const [numberEdit, setNumberEdit] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const [profiledata, setProfileData] = useState({
    name: user ? user.providerData[0].displayName : "",
    number: user ? user.providerData[0].phoneNumber : "",
    email: user ? user.providerData[0].email : "",
    currentScore: 0,
    doneToDos: 0,
    totalToDos: 0,
  });
  const db = getDatabase();
  const profileRef = ref(db, "profiles/" + props.userId);
  const handleNumberEdit = (number) => {
    if (numberEdit) {
      if (number !== "") {
        setNumberEdit(!numberEdit);
      }
    } else {
      setNumber(number);
      setNumberEdit(!numberEdit);
    }
  };

  useEffect(() => {
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData({
        ...profiledata,
        number: data !== null ? data.number : "",
        name: data !== null ? data.name : "",
      });
    });
  }, []);

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    } else {
      console.log("profiles/" + props.userId);
    }
  }, [props.userId]);

  const saveNumberToFirebase = () => {
    update(profileRef, {
      number: profiledata.number,
    });
  };
  const onSubmit = () => {
    updateProfile(user, {
      displayName: profiledata.name,
    })
      .then(() => {
        console.log("successfully saved");
        console.log(user.providerData[0]);
      })
      .catch((error) => {
        console.log("error ==>", error);
      });
    update(profileRef, {
      name: profiledata.name,
    });
  };
  const deleteHandler = () => {
    deleteUser(user)
      .then(() => {
        console.log("User Deleted!");
      })
      .catch((error) => {
        console.log("error ==>", error);
      });
  };
  const onChangeText = (text, field) => {
    setProfileData({ ...profiledata, [field]: text });
  };
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.personIcon}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="person-circle-outline" size={35} />
        </TouchableOpacity>
      </View>
      <EmailModal
        setEmailModal={setEmailModal}
        emailModal={emailModal}
        profiledata={profiledata}
        setProfileData={setProfileData}
      />
      <PassModal
        setPasswordModal={setPasswordModal}
        passwordModal={passwordModal}
        profiledata={profiledata}
        setProfileData={setProfileData}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.myInformation}>{" My Information "}</Text>

        {nameEdit ? (
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={(str) => onChangeText(str, "name")}
            onBlur={() => onSubmit()}
            value={profiledata.name === null ? "" : profiledata.name}
          />
        ) : (
          <Pressable onPress={() => setNameEdit(!nameEdit)}>
            <Text>{profiledata.name ? profiledata.name : "Name"}</Text>
          </Pressable>
        )}
        {numberEdit ? (
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={(str) => onChangeText(str, "number")}
            value={profiledata.number === null ? "" : profiledata.number}
            onBlur={() => saveNumberToFirebase()}
            keyboardType="numeric"
          />
        ) : (
          <Pressable onPress={() => setNumberEdit(!numberEdit)}>
            <Text>{profiledata ? profiledata.number : "Phone"}</Text>
          </Pressable>
        )}
        <Pressable onPress={() => setEmailModal(!emailModal)}>
          <Text style={styles.input}>
            {profiledata ? profiledata.email : "No email saved"}
          </Text>
        </Pressable>

        <View style={styles.changePasswordContainer}>
          <Pressable onPress={() => setPasswordModal(!passwordModal)}>
            {/* <TextInput
              placeholder={" Change Password "}
              style={styles.changePassword}
            ></TextInput> */}

            <Text style={styles.changePassword}>{" Change Password "}</Text>
          </Pressable>
        </View>

        <View style={styles.deleteContainer}>
          <TouchableOpacity
            style={styles.deleteItem}
            onPress={() => deleteHandler()}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.deleteProfile}>{" Delete Profile "}</Text>
        </View>
      </View>
    </View>
  );
};
export default Profile;
