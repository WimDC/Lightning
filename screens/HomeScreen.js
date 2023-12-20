import { StyleSheet, Text, View } from "react-native-web";
import { Banner } from "../components/Banner";
import { PressableButton } from "../components/PressableButton";
import tw from "twrnc";

export const HomeScreen = () => {
  return (
    <View>
      <Banner />
      <View style={styles.buttonView}>
        <PressableButton buttonName={"Testknop 1"}></PressableButton>
        <PressableButton buttonName={"Testknop 2"}></PressableButton>
        <PressableButton buttonName={"Testknop 3"}></PressableButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: tw`flex-col items-center mt-4`,
});
