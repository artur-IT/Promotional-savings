import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "@/constans/colors";

interface ButtonProps {
  title: string;
  width?: number;
  height?: number;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, width = 90, height = 40 }) => {
  const newWidth = width;
  const newHeight = height;

  const styles = StyleSheet.create({
    button: {
      width: newWidth,
      height: newHeight,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: colors.background.button_other,
    },

    text: {
      fontSize: 14,
      color: colors.text.button_W,
      // fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
