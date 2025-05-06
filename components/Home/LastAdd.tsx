import { StyleSheet, Text, View } from "react-native";

export default function LastAdd() {
  return (
    <View style={styles.section}>
      <Text>Ostatnio:</Text>
      <Text>+14 zł</Text>
      <Text>+14 zł</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "50%",
  },
});
