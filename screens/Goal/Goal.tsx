import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Top from "@/components/Top";
import EditTargetForm from "@/components/Goal/EditTargetForm";
import GoalProgress from "@/components/Goal/GoalProgress";
import Button from "@/components/Button";

export default function Goal() {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const EditHandle = () => {
    // setShowForm(!showForm);
    if (showForm) {
      // Animacja znikania
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowForm(false);
      });
    } else {
      // Najpierw pokaż formularz, potem animuj
      setShowForm(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mój Cel </Text>
        <Button title="Edytuj" onPress={EditHandle} />
      </View>

      <View style={styles.goal}>
        <GoalProgress />
      </View>

      {/* {showForm && <EditTargetForm />} */}
      {showForm && (
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <EditTargetForm />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 26,
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  goal: {
    marginTop: 30,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
});
