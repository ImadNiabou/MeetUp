import { View, Text, Image, Pressable } from 'react-native';
import { supabase } from '~/utils/supabase';
// icons
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import day js
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';

const EventListItem = ({ event }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  useEffect(() => {
    fetchNumberOfParticipants();
  }, [event.id]);

  const fetchNumberOfParticipants = async () => {
    const { count } = await supabase
      .from('Participation')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.id);
    setNumberOfParticipants(count);
    // console.log(count);
  };

  return (
    <Link href={`/event/${event.id}`} asChild>
      <Pressable className="m-2 rounded-lg bg-white p-3 ">
        <View className="flex-row justify-between ">
          <View>
            <Text className="text-semibold text-lg text-amber-800">
              {/* Format time white dayJS */}
              {dayjs(event.datetime).format('dddd, D, MMM')} ·{' '}
              {dayjs(event.datetime).format('h:mm A')}
            </Text>
            <Text className="mb-2 max-w-[230px] text-2xl font-bold">{event.title}</Text>

            <Text>{event.location}</Text>
          </View>
          {/* event image */}

          <Image className="aspect-ratio h-[90px] w-1/3 rounded-lg" source={{ uri: event.image }} />
        </View>

        {/* footer */}
        <View className="mt-5 flex-row justify-between">
          <Text className="text-gray-600">
            Participants <Text className="text-green-600">{numberOfParticipants}</Text>
          </Text>
          <View className="flex-row gap-2">
            <Feather name="share" size={24} color="gray" />
            <MaterialIcons name="bookmark-outline" size={24} color="gray" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default EventListItem;
