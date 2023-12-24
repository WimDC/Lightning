import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Slider } from "react-native-elements";
import tw from "twrnc";

export const LightControlButton = ({ lightId }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [getAllLights, setAllLights] = useState([{}]);
  const bridgeIp = "192.168.0.17";
  const username = "WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA";
  const [brightness, setBrightness] = useState(100);
  console.log("lightId :", lightId);

  const toggleLight = () => {
    // Build the URL for controlling the light
    const lightUrl = `http://${bridgeIp}/api/${username}/lights/${lightId}/state`;
    console.log("Light URL:", lightUrl);

    // Make the HTTP request
    fetch(lightUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        on: !isLightOn,
        bri: parseInt(brightness),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          logGetRequest();
        }, 1000);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleBrightnessChange = (value) => {
    // Update the brightness state as the user moves the slider
    setBrightness(value);

    // Build the URL for controlling the light
    const lightUrl = `http://${bridgeIp}/api/${username}/lights/${lightId}/state`;

    // Make the HTTP request
    fetch(lightUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bri: parseInt(value),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const logGetRequest = async () => {
    try {
      // Set up Axios instance with custom HTTP configuration
      const api = axios.create({
        baseURL:
          "http://192.168.0.17/api/WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA/",
      });

      const response = await api.get("lights");
      const configResponse = await api.get("config");
      const groupResponse = await api.get("groups");
      setAllLights(response.data);
      console.log("GET request response:", response.data);
      console.log("getAllLights :", getAllLights);
      console.log("configResponse :", configResponse);
      console.log("groupResponse :", groupResponse);

      const lightsData = Object.values(response.data);

      // Extract info from each light
      const uniqueIds = lightsData.map((light) => light.uniqueid);
      const lightOn = lightsData.map((light) => light.state.on);
      const brightnessLvl = lightsData.map((light) => light.state.bri);

      // Update the state locally
      setIsLightOn(lightOn[lightId - 1]);
      setBrightness(brightnessLvl[lightId - 1]);
      console.log("lightOn: ", isLightOn);
      console.log("All UniqueIds:", uniqueIds);
      console.log("IsLightOnArray: ", lightOn);
      console.log("BrightnessLvl: ", brightnessLvl);
    } catch (error) {
      console.error("GET request error:", error);
    }
  };

  useEffect(() => {
    logGetRequest();
  }, []);

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.lightText}> Light: {lightId}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            pressed && styles.pressablePressed,
            isLightOn && styles.flashyGreen,
          ]}
          onPress={toggleLight}
        >
          <Text style={styles.buttonText}>
            {isLightOn ? "Turn Off" : "Turn On"}
          </Text>
        </Pressable>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={254}
        step={1}
        value={brightness}
        onValueChange={handleBrightnessChange}
        thumbTintColor="#3498db"
        minimumTrackTintColor="#3498db"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: tw`rounded-md border-2 border-gray-300 p-2 m-2 bg-yellow-300`,
  rowContainer: tw`flex flex-row items-center justify-between mb-2`,
  lightText: tw`text-xl font-bold m-2`, // Adjust the font size and styling as needed
  pressable: tw`bg-blue-500 rounded-md p-2 items-center`,
  pressablePressed: tw`opacity-50`,
  buttonText: tw`text-white font-bold`,
  flashyGreen: tw`bg-green-500`,
  slider: tw`m-2`,
});

export default LightControlButton;
