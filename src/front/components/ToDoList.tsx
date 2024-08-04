import ToDo from "./ToDo";
import { useEffect, useState } from "react";
import { useGetToDo } from "../hooks/useGetToDo.ts";

import type { ToDoInputProps, ToDoType } from "./types.d.ts";

const ToDoList = ({ addedToDo, setAddedToDo }: ToDoInputProps) => {
  const [todos, setTodos] = useState<ToDoType[]>([]);

  useEffect(() => {
    useGetToDo(setTodos);
  }, [addedToDo]);

  return (
    <div>
      {todos.map(({ title, completed, id, userId, createdAt, notToDo }) => (
        <ToDo
          key={id}
          id={id}
          title={title}
          completed={completed}
          userId={userId}
          createdAt={createdAt}
          notToDo={notToDo}
          addedToDo={addedToDo}
          setAddedToDo={setAddedToDo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
