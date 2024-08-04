import { useState } from "react";

import { usePostToDo } from "../hooks/usePostToDo.ts";

import type { ToDoInputProps } from "./types.d.ts";

const ToDoInput = ({ setAddedToDo, addedToDo }: ToDoInputProps) => {
  const [newToDo, setNewToDo]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    usePostToDo(newToDo, setNewToDo, setAddedToDo, addedToDo);
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-[#fbe9c3] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm m-3"
        placeholder="¿Qué no hacemos hoy?"
        value={newToDo}
        onChange={handleChange}
      />
    </form>
  );
};

export default ToDoInput;
