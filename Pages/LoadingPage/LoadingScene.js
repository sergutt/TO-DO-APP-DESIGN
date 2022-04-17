import React, { useRef, useEffect, Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import doozit from "./doozit.png";
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 7000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
const LoadingScene = (props) => {
  const switchToAuth = () => {
    props.navigation.navigate("Auth");
  };
  useEffect(() => {
    setTimeout(() => {
      switchToAuth();
    }, 10000);
  }, []);

  return (
    <View style={styles.container}>
      <FadeInView>
        <Image source={doozit} />
      </FadeInView>
    </View>
  );
};

export default LoadingScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECD5D8",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontFamily: "GoogleSans-Bold",
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: "300",
  },
});
