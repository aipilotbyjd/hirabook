import React, { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AudioGuideProps = {
  audioFile: any;
  label: string;
};

export const AudioGuide = ({ audioFile, label }: AudioGuideProps) => {
  const sound = useRef<Audio.Sound | null>(null);

  const playSound = async () => {
    try {
      sound.current = new Audio.Sound();
      await sound.current.loadAsync(audioFile);
      await sound.current.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <TouchableOpacity style={styles.button} onPress={playSound}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
}); 