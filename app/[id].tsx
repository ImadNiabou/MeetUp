import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import EventCard from '~/components/EventCard';
import Skeleton from '~/components/Skeleton';
import { supabase } from '~/utils/supabase';

const Event = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();

    // Simulate loading delay
    setTimeout(() => {
      setEvent(data);
      setLoading(false);
    }, 100);
  };

  if (loading) return <Skeleton />;
  if (!event) return <Text>Event not found</Text>;

  return (
    <>
      <Stack.Screen options={{ title: 'Event' }} />
      <EventCard event={event} />
    </>
  );
};

export default Event;
