import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import YearSaving from "../../components/Home/YearSaving";
import MonthSaving from "../../components/Home/MonthSaving";
import LastAdd from "../../components/Home/LastAdd";
import GoalProgress from "../../components/Home/GoalProgress";
import { router } from "expo-router";
import Button from "@/components/Button";

const TopImage = require("@/assets/images/top_bg.svg");
const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function HomeWithGoal() {
  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
      <Image source={PlaceholderImage} style={styles.image} />
      <Text style={styles.slogan}>
        Promocyjne <br />
        oszczędności
      </Text>

      <View style={styles.year}>
        <YearSaving />
      </View>

      <View style={styles.circles}>
        <MonthSaving />
        <LastAdd />
      </View>

      <GoalProgress />

      <TouchableHighlight underlayColor="#DDDDDD" style={styles.link}>
        <Button title="Dodaj oszczędność" onPress={() => router.push("/(tabs)/(hidden)/addSaving")} width={150} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  link: { marginTop: 30, padding: 10, borderRadius: 5 },
  slogan: {
    marginLeft: -170,
    fontSize: 32,
    lineHeight: 40,
    marginTop: 30,
    marginBottom: 30,
    color: "#0084CE",
  },
  topImage: {
    position: "absolute",
    top: -150,
    width: 400,
    height: 400,
  },
  image: {
    position: "absolute",
    top: 190,
    width: 370,
    height: 370,
    opacity: 0.3,
  },
  year: {
    position: "relative",
    left: -90,
  },
  circles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 40,
  },
});
