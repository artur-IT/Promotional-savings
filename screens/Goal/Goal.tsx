import { Alert, Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Top from "@/components/Top";
import EditTargetForm from "@/components/Goal/EditTargetForm";
import GoalProgress from "@/components/Goal/GoalProgress";
import Button from "@/components/Button";
import colors from "@/constans/colors";
import { clearAllGoals, getAllGoals } from "@/store/goalsStore";

export default function Goal() {
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const goal = getAllGoals();

  const addHandle = () => {
    if (showForm) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowForm(false);
      });
    } else {
      setShowForm(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const cancelHandle = () => {
    Alert.alert("Czy na pewno chcesz usunąć wszystkie cele?", "Usunięcie celu spowoduje usunięcie wszystkich zapisanych celów.", [
      {
        text: "Nie",
        style: "cancel",
      },
      {
        text: "Tak",
        onPress: () => clearAllGoals(),
      },
    ]);
    clearAllGoals();
  };

  return (
    <>
      <Top />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Mój Cel </Text>
          <Button title={`${goal.length != 0 ? "Edytuj" : "Dodaj"}`} onPress={addHandle} />
          <Button title="CLEAR GOAL" height={25} onPress={cancelHandle} />
        </View>

        <View style={styles.goal}>
          <GoalProgress />
        </View>

        {showForm && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <EditTargetForm onFormClose={() => setShowForm(false)} />
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    // justifyContent: "center",
    marginTop: 80,
  },
  headerContainer: {
    width: 100,
    fontSize: 26,
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: colors.background.main,
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  goal: {
    marginTop: -10,
    marginBottom: 30,
  },
});
