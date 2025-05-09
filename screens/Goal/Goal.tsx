import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Top from "@/components/Top";
import EditTargetForm from "@/components/Goal/EditTargetForm";
import GoalProgress from "@/components/Goal/GoalProgress";
import Button from "@/components/Button";
import colors from "@/constans/colors";

export default function Goal() {
  const [showForm, setShowForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const EditHandle = () => {
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

  // Ukrywanie Tab Bar'a
  // useEffect(() => {
  //   navigation.setOptions({
  //     tabBarStyle: { display: "none" },
  //   });

  //   return () => {
  //     navigation.setOptions({
  //       tabBarStyle: { display: "flex" },
  //     });
  //   };
  // }, [navigation]);

  return (
    <>
      <Top />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Mój Cel </Text>
          <Button title="Edytuj" onPress={EditHandle} />
        </View>

        <View style={styles.goal}>
          <GoalProgress />
        </View>

        {showForm && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <EditTargetForm />
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
    marginTop: 30,
    marginBottom: 30,
  },
});
