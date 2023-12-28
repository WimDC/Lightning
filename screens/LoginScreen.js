import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { NAV_HOME } from "../navigation_constants";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace(NAV_HOME);
        const uid = user.uid;
      }
    });
    return unsubscribe;
  });

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with Email: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with Email: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../images/sunnybeach.jpg")}
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.welcomeText}>Welcome to Lightning!</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#eeee00",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#eeee00",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#eeee00",
    fontWeight: "700",
    fontSize: 16,
  },
  welcomeText: {
    color: "yellow",
    textDecorationLine: "underline",
    fontStyle: "italic",
    textDecorationColor: "orange",
    textDecorationStyle: "double",
    fontWeight: "800",
    fontSize: 45,
    textShadowColor: "black", // Outline color
    textShadowOffset: { width: 1, height: 1 }, // Outline offset
    textShadowRadius: 10, // Outline radius
    marginBottom: 50,
  },
});

export default LoginScreen;
