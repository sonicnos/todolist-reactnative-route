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
import { Ionicons } from "@expo/vector-icons";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../../api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const [todo, setTodo] = useState<any>("");
  const [taskItems, setTaskItems] = useState<any>([]);
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const deleteTodo = () => {
      deleteMutation.mutate(item.id);
    };

    return (
      <TouchableOpacity onPress={deleteTodo}>
        <View className="flex-row items-center justify-between p-4 mb-6 bg-white rounded-xl">
          <View className="flex-row flex-wrap items-center">
            <View className="w-8 h-8 mr-4 rounded-md bg-sky-500 opacity-40"></View>
            <Text className="max-w-full">{item.text}</Text>
          </View>

          <Ionicons name="trash" size={24} color="red" onPress={deleteTodo} />
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
    </View>
  );
}
