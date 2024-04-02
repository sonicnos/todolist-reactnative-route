const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Todos {
  id: number;
  text: string;
  done: boolean;
}

export const getTodos = async () => {
  // await sleep(2000);
  const response = await fetch(`${API_URL}`);
  const result = await response.json();
  return result;
};

//create todo
export const createTodo = async (text: string): Promise<Todo> => {
  const todo = {
    text,
    done: false,
  };
  const result = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return result.json();
};

// Update todo
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const result = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return result.json();
};

//delete todo
export const deleteTodo = async (id: number): Promise<Todo> => {
  const result = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return result.json();
};

//get todo by ID
export const getTodoById = async (id: number): Promise<Todo> => {
  const result = await fetch(`${API_URL}${id}`);
  return result.json();
};
