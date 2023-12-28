import { Pressable, StyleSheet, Text, View } from "react-native";
import { Banner } from "../components/Banner";
import tw from "twrnc";
import { NAV_LOGIN, NAV_ROOMS_LIST } from "../navigation_constants";
import { ImageBackground } from "react-native";
import RoomButton from "../components/RoomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogoff = () => {
    console.log(auth.currentUser?.email, " logged out");
    signOut(auth)
      .then(() => {
        navigation.navigate(NAV_LOGIN);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../images/suncolorfull.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Banner bannerName={"Lightning"} />
        <RoomButton name={NAV_ROOMS_LIST} constant={NAV_ROOMS_LIST} />
        <Pressable style={styles.logoffButton} onPress={handleLogoff}>
          <Text style={styles.logoffText}>Log Off</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: tw`flex-1 bg-opacity-20 bg-black p-4`,
  container: tw`flex-1`,
  logoffButton: tw`absolute top-4 right-4 p-2 mt-2 mr-2 bg-yellow-300 rounded-md`,
  logoffText: tw`text-white font-bold`,
});
