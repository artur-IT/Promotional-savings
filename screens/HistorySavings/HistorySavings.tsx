import HistoryCalendar from "@/components/HistorySaving/HistoryCalendar";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import Top from "@/components/Top";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { Picker } from "@react-native-picker/picker";

export default function HistorySavings() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectYear, setSelectYear] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const EditHandle = () => {
    if (showCalendar) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowCalendar(false);
      });
    } else {
      setShowCalendar(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleYearChange = (year: string) => {
    setSelectYear(year);

    if (year) {
      setShowCalendar(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowCalendar(false);
      });
    }
  };

  return (
    <ScrollView>
      <Top />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Historia <br />
          oszczędności
        </Text>
        <View style={styles.buttonsContainer}>
          <Picker style={styles.picker} selectedValue={selectYear} onValueChange={(value) => handleYearChange(value)}>
            <Picker.Item label="Rok" value="" />
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2024" value="2024" />
          </Picker>
          <Button title="Edytuj" height={40} onPress={EditHandle} />
        </View>
      </View>

      {showCalendar && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <HistoryCalendar />
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 26,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
  },
  picker: {
    width: 75,
    height: 40,
    backgroundColor: "black",
    borderColor: "black",
    color: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
});
