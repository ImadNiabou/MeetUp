import { View, Text, Image, Pressable } from 'react-native';

// icons
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import day js
import dayjs from 'dayjs';
import { Link } from 'expo-router';

const EventListItem = ({ event }) => {
  return (
    <Link href={`/${event.id}`} asChild>
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
          <Text>14 going</Text>
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
