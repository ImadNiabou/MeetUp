import { View, Text, Image, Pressable } from 'react-native';
// import day js
import dayjs from 'dayjs';
const EventCard = ({ event }) => {
  return (
    <View className="flex-1 p-4 bg-white">
      <Image className="w-full aspect-video rounded-2xl" source={{ uri: event.image }} />
      <Text className="mt-3 text-3xl font-bold text-gray-700 ">{event.title}</Text>
      <Text className="py-2 text-lg text-semibold text-amber-800">
        {/* Format time white dayJS */}
        {dayjs(event.datetime).format('dddd, D, MMM')} · {dayjs(event.datetime).format('h:mm A')}
      </Text>
      <Text className="text-xl text-gray-600">{event.description}</Text>
      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between pt-8 pb-6 mb-6 border-t border-slate-200 px-7">
        <Text className="p-5 px-8 text-xl font-semibold border border-red-400 rounded-xl">
          Free
        </Text>
        <Pressable className="p-5 px-8 bg-red-400 rounded-xl">
          <Text className="text-xl font-semibold text-white">Join and RSV</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventCard;
