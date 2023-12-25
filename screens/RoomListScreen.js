import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Banner } from "../components/Banner";
import tw from "twrnc";
import axios from "axios";
import { ImageBackground } from "react-native";
import RoomButton from "../components/RoomButton";
import { NAV_ROOM_DETAIL } from "../navigation_constants";

export const RoomListScreen = () => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const bridgeIp = "192.168.0.17";
      const username = "WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA";

      const response = await axios.get(
        `http://${bridgeIp}/api/${username}/groups`
      );

      const groupsData = response.data;

      const rooms = Object.values(groupsData).map((group) => ({
        name: group.name,
        lights: group.lights,
      }));

      setRoomList(rooms);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../images/sun.png")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Banner bannerName="Room List" />
        <View>
          {roomList.length > 0 && (
            <FlatList
              data={roomList}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <RoomButton
                    name={item.name}
                    lights={item.lights}
                    constant={NAV_ROOM_DETAIL}
                  />
                </View>
              )}
              keyExtractor={(room) => room.name}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: tw`flex-1`,
  overlay: tw`flex-1 bg-opacity-20 bg-black p-4`,
  listItem: tw`flex-row justify-between items-center`,
});
