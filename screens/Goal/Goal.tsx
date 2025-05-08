import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Top from "@/components/Top";
import NewGoal from "@/components/Goal/NewGoal";
import GoalProgress from "@/components/Goal/GoalProgress";
import Button from "@/components/Button";

export default function Goal() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    };
  }, [navigation]);

  return (
    <View>
      <Top />
      <Text style={styles.title}>Mój Cel </Text>
      <Button title="Edytuj cel" onPress={() => console.log("Dodano cel")} />
      <View style={styles.goal}>
        <GoalProgress />
      </View>

      <NewGoal />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    marginTop: 110,
    marginBottom: 30,
    marginLeft: 20,
  },
  goal: {
    marginTop: 30,
    marginBottom: 30,
  },
});
