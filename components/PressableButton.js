import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native-web";
import tw from "twrnc";

export const PressableButton = ({ buttonName }) => {
  const onPressHandler = () => {
    console.log("Press", buttonName);
  };

  return (
    <View style={styles.button}>
      <Pressable onPress={onPressHandler}>
        <Text style={styles.buttonText}> {buttonName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: tw`bg-blue-300 rounded-xl border-solid border-2 border-gray-200 shadow-xl h-10 w-25 items-center justify-center`,
  buttonText: tw`font-bold text-white `,
});
