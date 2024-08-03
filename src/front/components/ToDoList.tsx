import ToDo from "./ToDo";
import { useEffect, useState } from "react";
import type { ToDoProps } from "./types.d.ts";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todo`);
      const todos = await response.json();
      setTodos(todos);
    };
    fetchTodos();
  }, [todos]);

  return (
    <div>
      {todos.map(({ title, completed, id }) => (
        <ToDo key={id} title={title} completed={completed} />
      ))}
    </div>
  );
};

export default ToDoList;
