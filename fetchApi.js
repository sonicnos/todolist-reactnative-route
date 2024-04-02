const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(process.env.EXPO_PUBLIC_API_URL);
async function todos() {
  const response = await fetch(`http://192.168.0.113:3000/todos`);
  console.log(API_URL);
  const todosList = await response.json();
  console.log(todosList);
}

todos();
