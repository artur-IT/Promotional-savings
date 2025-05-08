import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = "primary", style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, type === "primary" ? styles.primaryButton : styles.secondaryButton, style]} onPress={onPress}>
      <Text style={[styles.text, type === "primary" ? styles.primaryText : styles.secondaryText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 45,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  primaryButton: {
    backgroundColor: "#000",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 16,
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#000",
  },
});

export default Button;
