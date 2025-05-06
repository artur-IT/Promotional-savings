import { Image, StyleSheet, Text, View } from "react-native";
import YearSaving from "../../components/Home/YearSaving";
import MonthSaving from "../../components/Home/MonthSaving";
import LastAdd from "../../components/Home/LastAdd";
import GoalProgress from "../../components/Home/GoalProgress";
import { Link } from "expo-router";

const PlaceholderImage = require("@/assets/images/money-bag.svg");

export default function HomeWithGoal() {
  return (
    <View style={styles.container}>
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

      <Link href="/addSaving" style={styles.link}>
        Dodaj oszczędność
      </Link>
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
