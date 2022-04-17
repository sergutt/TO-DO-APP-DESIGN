import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  const signout = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Auth");
  };
  return (
    <DrawerContentScrollView>
      <View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 60,
              marginBottom: 45,
              color: "#39A5B0",
              fontSize: 35,
              fontFamily: "Pacifico-Regular",

              lineHeight: 45,
              justifyContent: "center",
              alignSelf: "center",
              letterSpacing: -0.08,
            }}
          >
            Doozit
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              fontFamily: "Assistant-Regular",
              marginTop: 10,
              marginBottom: 5,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {/* {allProfiles.name} */}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <DrawerItemList
            style={{
              marginTop: -10,
              fontSize: 24,
              fontFamily: "Assistant-Regular",
              lineHeight: 98.1,
              letterSpacing: -0.08,
              color: "#000",
            }}
            {...props}
          />
        </View>
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
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={signout}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Assistant-Regular",
              alignSelf: "center",
              // fontWeight: 600,
              letterSpacing: -0.08,
              color: "#000000",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
