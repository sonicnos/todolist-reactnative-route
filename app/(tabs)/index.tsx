import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "../../components/Task";

export default function index() {
  const [task, setTask] = useState<any>();
  const [taskItems, setTaskItems] = useState<any>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index: any) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  return (
    <View className="flex-1 bg-slate-300">
      {/* Today's tasks */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="pt-4 px-5 min-h-[10%]">
          <Text className="mb-4 text-3xl font-bold ">Today's tasks</Text>

          <View>
            {/* This is where the task will go */}
            {taskItems.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/*Write a task*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute flex-row items-center justify-around w-full bottom-10"
      >
        <TextInput
          className="w-64 px-4 py-4 bg-white border rounded-full border-neutral-500"
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity className="" onPress={() => handleAddTask()}>
          <View className="items-center justify-center w-16 h-16 bg-white border rounded-full border-neutral-500">
            <Text className="text-3xl">+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
