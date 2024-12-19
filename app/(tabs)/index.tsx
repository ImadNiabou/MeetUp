import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import EventListItem from '~/components/EventListItem';
import events from '../../assets/events.json';
export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList data={events} renderItem={({ item }) => <EventListItem event={item} />} />
    </>
  );
}
