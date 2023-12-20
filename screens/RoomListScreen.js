import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native-web";
import { Banner } from "../components/Banner";
import tw from "twrnc";
import { NAV_ROOMS_LIST } from "../navigation_constants";
import { PressableButton } from "../components/PressableButton";

export const RoomListScreen = () => {
  const [roomList, setRoomList] = useState([]);
  const [roomNameInput, setRoomNameInput] = useState("");
  const [roomFloorInput, setRoomFloorInput] = useState("");

  const createRoom = () => {
    if (roomNameInput === "") {
      alert("Please enter a room name");
      return;
    }

    if (roomFloorInput === "") {
      alert("Please enter a floor");
      return;
    }

    let room = {
      name: roomNameInput,
      floor: roomFloorInput,
    };

    setRoomList((prevRoomList) => [...prevRoomList, room]);

    setRoomNameInput("");
    setRoomFloorInput("");
  };

  useEffect(() => {
    console.log("Updated roomList:", roomList);
  }, [roomList]);

  const Room = ({ name, floor }) => (
    <View style={styles.roomContainer}>
      <Text style={styles.roomName}>{name}</Text>
      <Text style={styles.roomFloor}>{floor}</Text>
    </View>
  );

  return (
    <View>
      <Banner bannerName={NAV_ROOMS_LIST} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Room Name"
          onChange={(e) => setRoomNameInput(e.nativeEvent.text)}
          value={roomNameInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Floor"
          onChange={(e) => setRoomFloorInput(e.nativeEvent.text)}
          value={roomFloorInput}
        />
        <button style={styles.createButton} onClick={createRoom}>
          Create Room
        </button>
      </View>
      <View>
        {roomList.length > 0 && (
          <FlatList
            data={roomList}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Room name={item.name} floor={item.floor} />
                <Pressable>
                  <Text>Go to Room</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(room) => room.name}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: tw`p-4`,
  inputContainer: tw`mb-4`,
  textInput: tw`h-8 w-40 border border-gray-400 mb-2 p-2 rounded-md`,
  createButton: tw`bg-blue-500 text-white px-4 py-2 rounded-md`,
  roomContainer: tw`bg-gray-100 p-4 mb-2 rounded-md flex items-center justify-between`,
  roomName: tw`text-lg font-semibold text-gray-800`,
  roomFloor: tw`text-sm text-gray-500`,
  listItem: tw`flex-row justify-between items-center`,
});
