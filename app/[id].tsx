import { View, Text, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import events from '../assets/events.json';

import EventCard from '~/components/EventCard';
const event = () => {
  const { id } = useLocalSearchParams();
  const event = events.find((e) => e.id === id);
  if (!event) {
    return <Text>Event not found</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Event' }} />
      <EventCard event={event} />
    </>
  );
};

export default event;
