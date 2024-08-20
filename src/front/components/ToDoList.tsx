import ToDo from "./ToDo";
import { useEffect, useState } from "react";
import { useGetToDo } from "../hooks/useGetToDo.ts";

import type { ToDoInputProps, ToDoType } from "./types.d.ts";
import NotToDo from "./NotToDo.tsx";

const ToDoList = ({ addedToDo, setAddedToDo }: ToDoInputProps) => {
  const [todos, setTodos] = useState<ToDoType[]>([]);

  useEffect(() => {
    useGetToDo(setTodos);
  }, [addedToDo]);

  return (
    <div className="flex flex-col">
      {todos.map(({ title, completed, id, userId, createdAt, notToDo }) => (
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/2">
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
          </div>
          <div className="md:w-1/2">
            <NotToDo
              addedToDo={addedToDo}
              setAddedToDo={setAddedToDo}
              key={id + 1}
              id={id}
              title={title}
              completed={completed}
              userId={userId}
              createdAt={createdAt}
              notToDo={notToDo}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
