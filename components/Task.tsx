import React from "react";
import { View, Text } from "react-native";

const Task = (props: any) => {
  return (
    <View className="bg-white p-4 rounded-xl flex-row items-center justify-between mb-6">
      <View className="flex-row items-center flex-wrap">
        <View className="w-8 h-8 bg-sky-500 opacity-40 rounded-md mr-4"></View>
        <Text className="max-w-full">{props.text}</Text>
      </View>
      <View className="w-3 h-3 bg-white border-sky-500 rounded border-2"></View>
    </View>
  );
};

export default Task;
