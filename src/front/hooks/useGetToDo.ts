import type { ToDoType } from "../components/types";
import { useUserIdFromToken } from "./indexs.ts";

export const useGetToDo = async (
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>
) => {
  const token = sessionStorage.getItem("token")!;
  const userId = useUserIdFromToken();
  {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/todos/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const userToDos = data[0].todo;
        const mapedToDos: ToDoType[] = userToDos.map((todo: ToDoType) => {
          return {
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            userId: todo.userId,
            createdAt: todo.createdAt,
            notToDo: todo.notToDo,
          };
        });
        setTodos(mapedToDos);
      } else {
        console.error(
          `Error en la respuesta de la API: ${response.statusText}`
        );
      }
    } catch (error) {
      alert(`Error al obtener los todos: ${error}`);
    }
  }
};
