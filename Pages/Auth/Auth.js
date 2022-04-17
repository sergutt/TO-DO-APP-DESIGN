import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Button from "../../constants/Button";
import LabeledInput from "../../constants/LabeledInput";
import Colors from "../../constants/Colors";
import validator from "validator";
import doozit from "./doozit.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./styles";

const Login = (props) => {
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  const validateFields = (email, password) => {
    const isValid = {
      email: validator.isEmail(email),
      password: validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    };

    return isValid;
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(props.userAuth, email, password);
  };

  const createAccount = (email, password) => {
    createUserWithEmailAndPassword(props.userAuth, email, password);
  };
  useEffect(() => {
    if (props.userId !== "") {
      props.navigation.navigate("Home");
    }
  }, [props.userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={doozit} />
      </View>

      <View style={{ flex: 1 }}>
        <LabeledInput
          label=""
          placeholder="Enter Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email"
        />
        <LabeledInput
          label=""
          placeholder="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text });
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
        />
        {isCreateMode && (
          <LabeledInput
            label="Re-enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setEmailField({ ...emailField });
            isAllValid = false;
          }

          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
            setPasswordField({ ...passwordField });
            isAllValid = false;
          }

          if (isCreateMode && passwordReentryField.text != passwordField.text) {
            passwordReentryField.errorMessage = "Passwords do not match";
            setPasswordReentryField({ ...passwordReentryField });
            isAllValid = false;
          }

          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{
          backgroundColor: Colors.orange,
          width: 275,
          height: 60,
          marginBottom: 10,
          alignSelf: "center",
        }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

export default Login;
