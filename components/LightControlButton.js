import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export const LightControlButton = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [getAllLights, setAllLights] = useState([{}]);
  const bridgeIp = "192.168.0.17"; // Replace with your Philips Hue Bridge IP address
  const username = "WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA"; // Replace with your Hue API username

  const toggleLight = () => {
    // Update the state locally
    setIsLightOn((prevIsLightOn) => !prevIsLightOn);

    // Build the URL for controlling the light
    const lightUrl = `http://${bridgeIp}/api/${username}/lights/1/state`;

    // Log the constructed URL
    console.log("Light URL:", lightUrl);

    // Make the HTTP request
    fetch(lightUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        on: !isLightOn,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    logGetRequest();
  };

  const logGetRequest = async () => {
    try {
      // Set up Axios instance with custom HTTP configuration
      const api = axios.create({
        baseURL:
          "http://192.168.0.17/api/WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA/lights/",
      });

      const response = await api.get();
      setAllLights(response.data);
      console.log("GET request response:", response.data);
      console.log("getAllLights :", getAllLights);

      const lightsData = Object.values(response.data);

      // Extract uniqueids from each light
      const uniqueIds = lightsData.map((light) => light.uniqueid);
      console.log("All UniqueIds:", uniqueIds);
    } catch (error) {
      console.error("GET request error:", error);
    }
  };

  useEffect(() => {
    // Log the GET request when the component mounts
    logGetRequest();
  }, []);

  return (
    <View style={styles.button}>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressablePressed,
        ]}
        onPress={toggleLight}
      >
        <Text style={styles.buttonText}>
          {isLightOn ? "Turn Off" : "Turn On"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // Add your button styles here
  },
  pressable: {
    // Add your pressable styles here
  },
  pressablePressed: {
    // Add your pressed styles here
  },
  buttonText: {
    // Add your button text styles here
  },
});

export default LightControlButton;
