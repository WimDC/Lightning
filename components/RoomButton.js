import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NAV_ROOM_DETAIL } from "../navigation_constants";

const RoomButton = ({ name, lights, constant }) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate(constant, { name, lights });
  };

  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.roomContainer}>
        <Text style={styles.roomName}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: tw`flex-1`,
  roomContainer: tw`bg-gray-100 p-4 mb-2 rounded-md flex items-center justify-between`,
  roomName: tw`text-lg font-semibold text-gray-800`,
});

export default RoomButton;
