import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import tw from "twrnc";

export const LightControlButton = ({ lightId }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [getAllLights, setAllLights] = useState([{}]);
  const bridgeIp = "192.168.0.17";
  const username = "WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA";
  console.log("lightId :", lightId);

  const toggleLight = () => {
    // Build the URL for controlling the light
    const lightUrl = `http://${bridgeIp}/api/${username}/lights/${lightId}/state`;

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
      .then((data) => {
        console.log(data);
        logGetRequest();
      })
      .catch((error) => console.error("Error:", error));
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
      const lightOn = lightsData.map((light) => light.state.on);
      // Update the state locally
      setIsLightOn(lightOn[lightId - 1]);
      console.log("lightOn: ", isLightOn);
      console.log("All UniqueIds:", uniqueIds);
      console.log("IsLightOnArray: ", lightOn);
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
          isLightOn && styles.flashyGreen,
        ]}
        onPress={toggleLight}
      >
        <View>
          <Text> light: {lightId}</Text>
          <Text style={styles.buttonText}>
            {isLightOn ? "Turn Off" : "Turn On"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: tw`rounded-md border-2 border-gray-300 p-2 m-2`,
  pressable: tw`bg-blue-500 rounded-md p-2 items-center`,
  pressablePressed: tw`opacity-50`,
  buttonText: tw`text-white font-bold`,
  flashyGreen: tw`bg-green-500`,
});

export default LightControlButton;
