import { StyleSheet, Text, View } from "react-native";
import { Banner } from "../components/Banner";
import tw from "twrnc";
import { NAV_ROOMS_LIST } from "../navigation_constants";
import { ImageBackground } from "react-native";
import RoomButton from "../components/RoomButton";

export const HomeScreen = () => {
  return (
    <ImageBackground
      source={require("../images/suncolorfull.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Banner bannerName={"Lightning"} />
        <RoomButton name={NAV_ROOMS_LIST} constant={NAV_ROOMS_LIST} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonView: tw`flex-col items-center mt-4`,
  overlay: tw`flex-1 bg-opacity-20 bg-black p-4`,
  container: tw`flex-1`,
});
