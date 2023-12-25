import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import LightControlButton from "../components/LightControlButton";
import { Banner } from "../components/Banner";
import tw from "twrnc";

export const RoomDetailScreen = ({ route }) => {
  const { name, lights } = route.params || {};
  const [lightNames, setLightNames] = useState({});

  const fetchLightNames = async () => {
    try {
      const bridgeIp = "192.168.0.17";
      const username = "WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA";
      const response = await axios.get(
        `http://${bridgeIp}/api/${username}/lights`
      );

      const lightNamesData = response.data;
      setLightNames(lightNamesData);
    } catch (error) {
      console.error("Error fetching light names:", error);
    }
  };

  useEffect(() => {
    fetchLightNames();
  }, []);

  const handleLightPress = (lightId) => {
    console.log(`Pressed light ${lightNames[lightId].name} in room ${name}`);
  };

  return (
    <ImageBackground
      source={require("../images/Lightning.png")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Banner bannerName="Room" />
        <View style={styles.roomNamePosition}>
          <Text style={styles.roomName}>{name}</Text>
        </View>

        <View style={styles.buttonView}>
          {lights &&
            lights.map((lightId) => (
              <LightControlButton
                key={lightId}
                lightId={lightId}
                lightName={lightNames[lightId]?.name || `Light ${lightId}`}
                onPress={() => handleLightPress(lightId)}
              />
            ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: tw`flex-1`,
  roomNamePosition: tw`justify-center items-center pt-4`,
  roomName: tw`text-lg font-semibold text-white mb-4 text-2xl font-bold mb-4`,
  lightContainer: tw`flex flex-row flex-wrap justify-between`,
  buttonView: tw`flex-col items-center mt-4`,
  overlay: tw`flex-1 bg-opacity-20 bg-black p-4`,
});

export default RoomDetailScreen;
