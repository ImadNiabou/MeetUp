import { View, Text, Image, Pressable } from 'react-native';
// import day js
import dayjs from 'dayjs';
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/contexts/AuthProvider';
import { useState } from 'react';
const EventCard = ({ event, participation }) => {
  const { user } = useAuth();
  const joinEvent = async () => {
    const { data, error } = await supabase
      .from('Participation')
      .insert({ user_id: user.id, event_id: event.id })
      .select()
      .single();
    console.log(data);
    console.log(error);
  };
  return (
    <View className="flex-1 bg-white p-4">
      <Image className="aspect-video w-full rounded-2xl" source={{ uri: event.image }} />
      <Text className="mt-3 text-3xl font-bold text-gray-700 ">{event.title}</Text>
      <Text className="text-semibold py-2 text-lg text-amber-800">
        {/* Format time white dayJS */}
        {dayjs(event.datetime).format('dddd, D, MMM')} · {dayjs(event.datetime).format('h:mm A')}
      </Text>
      <Text className="text-xl text-gray-600">{event.description}</Text>

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
  );
};

export default EventCard;
