import { StyleSheet, Text, View } from "react-native-web";
import { Banner } from "../components/Banner";
import { PressableButton } from "../components/PressableButton";
import tw from "twrnc";
import { NAV_ROOMS_LIST } from "../navigation_constants";

export const HomeScreen = () => {
  return (
    <View>
      <Banner bannerName={"Lightning"} />
      <View style={styles.buttonView}>
        <PressableButton
          buttonName={NAV_ROOMS_LIST}
          navLink={NAV_ROOMS_LIST}
        ></PressableButton>
        <PressableButton buttonName={"Testknop 2"}></PressableButton>
        <PressableButton buttonName={"Testknop 3"}></PressableButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: tw`flex-col items-center mt-4`,
});
