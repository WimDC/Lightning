import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

export const PressableButton = ({ buttonName, navLink }) => {
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();
  const onPressIn = () => {
    setPressed(true);
  };
  const onPressOut = () => {
    setPressed(false);
  };

  return (
    <View style={styles.button}>
      <Pressable
        style={{ opacity: pressed ? 0.5 : 1 }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => navigation.navigate(navLink)}
      >
        <Text style={styles.buttonText}> {buttonName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: tw`bg-blue-300 rounded-xl border-solid border-2 border-gray-200 shadow-xl h-10 w-25 items-center justify-center`,
  buttonText: tw`font-bold text-white `,
  pressablePressed: tw`opacity-50`,
});
