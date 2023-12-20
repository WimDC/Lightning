import { Text, View, StyleSheet } from "react-native-web";
import tw from "twrnc";

export const Banner = ({ bannerName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bannerText}>{bannerName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: tw`bg-blue-500 p-4 items-center flex`,
  bannerText: tw`text-yellow-400`,
});
