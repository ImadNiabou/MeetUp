import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { supabase } from '../../utils/supabase';

import EventListItem from '~/components/EventListItem';

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    setEvents(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList data={events} renderItem={({ item }) => <EventListItem event={item} />} />
    </>
  );
}
