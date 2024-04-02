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
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../../api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Task from "../../components/Task";

export default function App() {
  const [todo, setTodo] = useState<any>("");
  const [taskItems, setTaskItems] = useState<any>([]);
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTask = () => {
    Keyboard.dismiss();
    addMutation.mutate(todo);
  };

  const updateQueryClient = (updateTodo: Todo) => {
    queryClient.setQueryData(["todos"], (data: any) => {
      return data.map((todo: Todo) =>
        todo.id === updateTodo.id ? updateTodo : todo
      );
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: updateQueryClient,
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const toggleDone = () => {
      updateMutation.mutate({ ...item, done: !item.done });
    };

    return (
      <TouchableOpacity onPress={toggleDone}>
        <View className="flex-row items-center justify-between p-4 mb-6 bg-white rounded-xl">
          <View className="flex-row flex-wrap items-center">
            <View className="w-8 h-8 mr-4 rounded-md bg-sky-500 opacity-40"></View>
            <Text className="max-w-full">{item.text}</Text>
          </View>

          {item.done && (
            <View className="w-3 h-3 border-2 rounded bg-sky-500 "></View>
          )}
          {!item.done && (
            <View className="w-3 h-3 bg-white border-2 rounded border-sky-500"></View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-300">
      {/* Today's tasks */}
      <View className="pt-4 px-5 min-h-[10%]">
        <Text className="mb-4 text-3xl font-bold ">Today's tasks</Text>

        <View>
          {/* This is where the task will go */}

          {todosQuery.isLoading ? <ActivityIndicator size={"large"} /> : null}
          {todosQuery.isError ? <Text>Couldn't load todos</Text> : null}

          <FlatList
            data={todosQuery.data}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>

      {/*Write a task*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute flex-row items-center justify-around w-full bottom-10"
      >
        <TextInput
          className="w-64 px-4 py-4 bg-white border rounded-full border-neutral-500"
          placeholder={"Write a task"}
          value={todo}
          onChangeText={setTodo}
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
