import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import YearSaving from "../../components/Home/YearSaving";
import MonthSaving from "../../components/Home/MonthSaving";
import LastAdd from "../../components/Home/LastAdd";
import GoalProgress from "../../components/Goal/GoalProgress";
import { Link } from "expo-router";

const TopImage = require("@/assets/images/top_bg.svg");
const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function HomeWithGoal() {
  return (
    <View style={styles.container}>
      <Image source={TopImage} style={styles.topImage} />
      <Image source={PlaceholderImage} style={styles.image} />
      <Text style={styles.slogan}>Promocyjne oszczędności</Text>

      <View style={styles.year}>
        <YearSaving />
      </View>

      <View style={styles.circles}>
        <MonthSaving />
        <LastAdd />
      </View>

      <GoalProgress />

      <TouchableHighlight onPress={() => {}} underlayColor="#DDDDDD" style={styles.link}>
        <Link href="/addSaving">Dodaj oszczędność</Link>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  link: { borderColor: "red", borderWidth: 1, marginTop: 50, padding: 10, borderRadius: 5 },
  slogan: {
    fontSize: 36,
    lineHeight: 40,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
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
