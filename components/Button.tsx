import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';

interface ButtonProps {
  bgColor?: string;
  title: string;
  width?: number;
  height?: number;
  radius?: number;
  disabled?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  bgColor = colors.background.blue,
  title,
  onPress,
  width = 90,
  height = 40,
  radius = 5,
  disabled = false,
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
      backgroundColor: colors.background.blue,
    },

    text: {
      fontSize: 16,
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
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgColor,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
          transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
        },
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: disabled ? '#999' : colors.text.button_W },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
