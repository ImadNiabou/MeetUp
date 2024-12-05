import { View, Text, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import events from '../assets/events.json';
const event = () => {
  const { id } = useLocalSearchParams();

  const event = events.find((e) => e.id === id);
  return (
    <View>
      <Text>Event title: {event?.title}</Text>
      <Image className="aspect-ratio h-[90px] w-1/3 rounded-lg" source={{ uri: event.image }} />
    </View>
  );
};

export default event;
