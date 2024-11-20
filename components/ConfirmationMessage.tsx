import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

type ConfirmationMessageProps = {
  message: string;
  visible: boolean;
};

export const ConfirmationMessage = ({ message, visible }: ConfirmationMessageProps) => {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor: colors.success }]}>
      <Text style={[styles.text, { color: colors.white }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 