import { useState } from "react";

import Trash from "./icons/Trash";
import { useDeleteToDo, useCompleted } from "../hooks/indexs.ts";
import type { ToDoType, ToDoInputProps } from "./types.d.ts";

const ToDo = ({
  id,
  title,
  completed,
  addedToDo,
  setAddedToDo,
}: ToDoType & ToDoInputProps) => {
  const [toDocompleted, setToDoCompleted] = useState<boolean>(completed);

  const handleDelete = async () => {
    await useDeleteToDo(id, addedToDo, setAddedToDo);
  };

  const handleCompleted = async () => {
    const newCompleted = !toDocompleted;
    setToDoCompleted(newCompleted);

    await useCompleted(id, newCompleted, addedToDo, setAddedToDo);
  };

  return (
    <div
      key={id}
      className="flex items-center m-10 bg-[#fbe9c3] rounded-lg text-[#4A249D]"
    >
      <button onClick={() => handleCompleted()}>
        {completed ? "✅" : "❌"}
      </button>
      <h1 className={`text-xl m-3 ${toDocompleted ? "line-through" : ""}`}>
        {title}
      </h1>
      <article>
        <Trash
          className="m-2 hover:cursor-pointer size-[1.5rem]"
          onClick={handleDelete}
        />
      </article>
    </div>
  );
};

export default ToDo;
