import { useLocalSearchParams, Stack, Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import dayjs from 'dayjs';
import Skeleton from '~/components/Skeleton';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

const Event = () => {
  const [participation, setParticipation] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const joinEvent = async () => {
    const { data, error } = await supabase
      .from('Participation')
      .insert({ user_id: user.id, event_id: event.id })
      .select()
      .single();
    // console.log(data);i
    // console.log(error);
    setParticipation(data);
  };

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    setEvent(data);
    // Simulate loading delay
    // setTimeout(() => {
    //   setEvent(data);
    //   setLoading(false);
    // }, 100);
    const { data: participationData } = await supabase
      .from('Participation')
      .select('*')
      .eq('user_id', user.id)
      .eq('event_id', id)
      .single();
    setParticipation(participationData);
    setLoading(false);
  };

  if (loading) return <Skeleton />;
  if (!event) return <Text>Event not found</Text>;

  return (
    <>
      <Stack.Screen options={{ title: 'Event' }} />
      {/* <EventCard event={event} participation={participation} /> */}
      <View className="flex-1 bg-white p-4">
        <Image className="aspect-video w-full rounded-2xl" source={{ uri: event.image }} />
        <Text className="mt-3 text-3xl font-bold text-gray-700 ">{event.title}</Text>
        <Text className="text-semibold py-2 text-lg text-amber-800">
          {/* Format time white dayJS */}
          {dayjs(event.datetime).format('dddd, D, MMM')} · {dayjs(event.datetime).format('h:mm A')}
        </Text>
        <Text className="text-xl text-gray-600">{event.description}</Text>
        <Link
          className="my-4 max-w-[200px] rounded-md "
          href={`/event/${event.id}/participant`}
          asChild>
          <Pressable onPress={() => joinEvent()} className="rounded-xl bg-gray-200 p-5 px-8">
            <Text className="text-center text-lg font-semibold text-gray-700">
              View Participant
            </Text>
          </Pressable>
        </Link>
        {/* Footer */}
        <View className="absolute bottom-0 left-0 right-0 mb-6 flex-row items-center justify-between border-t border-slate-200 px-7 pb-6 pt-8">
          <Text className="rounded-xl border border-red-400 p-5 px-8 text-xl font-semibold">
            Free
          </Text>

          {participation ? (
            <Text className="text-xl text-green-600">You are going</Text>
          ) : (
            <Pressable onPress={() => joinEvent()} className="rounded-xl bg-red-400 p-5 px-8">
              <Text className="text-xl font-semibold text-white">Join and RSV</Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default Event;
