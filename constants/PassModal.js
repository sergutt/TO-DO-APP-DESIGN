import React, { useState } from "react";
import styles from "../Pages/Profile/styles";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  TextInput,
  Button,
} from "react-native";

import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const PassModal = ({
  setPasswordModal,
  passwordModal,
  profiledata,
  setProfileData,
}) => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });

  const auth = getAuth();
  const user = auth.currentUser;

  const submitNewPassword = () => {
    const credential = EmailAuthProvider.credential(
      user.providerData[0].email,
      form.oldPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, form.newPassword)
          .then(() => {
            console.log("successfully updated password");
            setPasswordModal(false);
          })
          .catch((error) => {
            console.log("nope ===>", error);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={passwordModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
        // style={styles.infoContainer}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 300,
            height: 400,
          }}
        >
          <Text style={styles.myInformation}>Change Password</Text>
          <TextInput
            style={[styles.input, { width: 275 }]}
            placeholder="Old Password"
            onChangeText={(input) => setForm({ ...form, oldPassword: input })}
          />
          <TextInput
            style={[styles.input, { width: 275 }]}
            placeholder="New Password"
            onChangeText={(input) => setForm({ ...form, newPassword: input })}
          />

          <View
            style={{
              marginVertical: 100,
              backgroundColor: "#ffffff",
              borderWidth: 3,
              width: 193,
              height: 47,
              borderRadius: 30,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity onPress={() => submitNewPassword()}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Assistant-Regular",
                  alignSelf: "center",
                  // fontWeight: 600,
                  letterSpacing: -0.08,
                  color: "#000000",
                  // marginTop: 40,
                }}
              >
                Update Password
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 3,
              width: 193,
              height: 47,
              borderRadius: 30,

              justifyContent: "center",
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => setPasswordModal(!passwordModal)}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Assistant-Regular",
                  alignSelf: "center",
                  // fontWeight: 600,
                  letterSpacing: -0.08,
                  color: "#000000",
                  // marginTop: 150,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PassModal;
