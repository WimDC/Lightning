import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: tw`bg-yellow-400`,
  headerTitleStyle: tw`text-white`,
};

export function ProvidedApp() {
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="home" component={HomeScreen} />
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
