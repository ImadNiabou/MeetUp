import React from 'react';
import { View } from 'react-native';

const SkeletonComponent = () => {
  return (
    <View className="flex-1 p-4 bg-white">
      {/* Skeleton for Image */}
      <View className="aspect-video min-h-[200px] w-full animate-pulse rounded-2xl bg-gray-200" />

      {/* Skeleton for Title */}
      <View className="w-3/4 h-8 mt-3 bg-gray-200 rounded-md animate-pulse" />

      {/* Skeleton for Date */}
      <View className="w-1/2 h-6 mt-2 bg-gray-200 rounded-md animate-pulse" />

      {/* Skeleton for Description */}
      <View className="w-full h-24 mt-2 bg-gray-200 rounded-md animate-pulse" />

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between pt-8 pb-6 mb-6 border-t border-slate-200 px-7">
        <View className="w-20 h-12 bg-gray-200 animate-pulse rounded-xl" />
        <View className="w-40 h-12 bg-gray-200 animate-pulse rounded-xl" />
      </View>
    </View>
  );
};

export default SkeletonComponent;
