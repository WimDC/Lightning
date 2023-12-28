import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import {
  NAV_HOME,
  NAV_LOGIN,
  NAV_ROOMS_LIST,
  NAV_ROOM_DETAIL,
} from "./navigation_constants";
import { RoomListScreen } from "./screens/RoomListScreen";
import { RoomDetailScreen } from "./screens/RoomDetailScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: tw`bg-yellow-400`,
  headerTitleStyle: tw`text-white`,
};

export function ProvidedApp() {
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={NAV_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAV_HOME} component={HomeScreen} />
        <Stack.Screen name={NAV_ROOMS_LIST} component={RoomListScreen} />
        <Stack.Screen name={NAV_ROOM_DETAIL} component={RoomDetailScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return Platform.select({
    web: (
      <NavigationContainer>
        <ProvidedApp />
      </NavigationContainer>
    ),
    default: (
      <NavigationContainer>
        <StatusBar />
        <ProvidedApp />
      </NavigationContainer>
    ),
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
