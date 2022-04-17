import React, { useState } from "react";
import styles from "../Pages/Profile/styles";

import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  Button,
} from "react-native";

import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";

const EmailModal = ({
  emailModal,
  setEmailModal,
  profiledata,
  onChangeText,
  setProfileData,
}) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const auth = getAuth();
  const user = auth.currentUser;

  const submitNewEmail = () => {
    const credential = EmailAuthProvider.credential(
      user.providerData[0].email,
      form.password
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, form.email).then(() => {
          console.log("successfully saved a new email");
          setProfileData({ ...profiledata, email: form.email });
          setEmailModal(false);
        });
      })
      .catch((err) => console.log("Nooooooooooo", err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={emailModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
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
          <Text style={styles.myInformation}>Change Email</Text>
          <TextInput
            placeholder="Enter new email"
            style={[styles.input, { width: 275 }]}
            onChangeText={(input) => setForm({ ...form, email: input })}
          />
          <TextInput
            placeholder="Enter password"
            style={[styles.input, { width: 275 }]}
            onChangeText={(input) => setForm({ ...form, password: input })}
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
            <TouchableOpacity onPress={() => submitNewEmail()}>
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
                Update Email
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
            <TouchableOpacity onPress={() => setEmailModal(!emailModal)}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Assistant-Regular",
                  alignSelf: "center",
                  letterSpacing: -0.08,
                  color: "#000000",
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

export default EmailModal;
