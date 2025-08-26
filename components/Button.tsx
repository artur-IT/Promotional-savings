import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';

interface ButtonProps {
  bgColor?: string;
  title: string;
  width?: number;
  height?: number;
  radius?: number;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  bgColor = colors.background.blue,
  title,
  onPress,
  width = 90,
  height = 40,
  radius = 5,
}) => {
  const newWidth = width;
  const newHeight = height;

  const styles = StyleSheet.create({
    button: {
      width: newWidth,
      height: newHeight,
      borderRadius: radius,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: colors.background.blue,
    },

    text: {
      fontSize: 18,
      color: colors.text.button_W,
      textAlign: 'center',
      fontFamily: 'Quicksand',
    },
    text2: {
      // fontSize: 18,
      color: colors.text.button_W,
      fontFamily: 'Lexend',
    },
  });

  return (
    <Pressable
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
      {/* <Text style={styles.text2}>{title}</Text> */}
    </Pressable>
  );
};

export default Button;
