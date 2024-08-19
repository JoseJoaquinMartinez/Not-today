import { useState, useEffect } from "react";
import Trash from "./icons/Trash";
import { useDeleteToDo, useCompleted } from "../hooks/indexs.ts";
import type { ToDoType, ToDoInputProps } from "./types.d.ts";
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const NotToDo = ({
  id,
  title,
  completed,
  addedToDo,
  setAddedToDo,
}: ToDoType & ToDoInputProps) => {
  const [notToDoTitle, setNotToDoTitle] = useState<string>('');
  const [notToDoCompleted, setNotToDoCompleted] = useState<boolean>(completed);

  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

  useEffect(() => {
    const generateNotToDo = async () => {
      try {
        const prompt = `te gusta procastinar, quiero que me generes una excusa divertida y original por la que no deba hacer la siguiente tarea "${title}". Contesta en el mismo idioma que este la tarea`;
        const { text } = await generateText({
          model: groq('llama3-8b-8192'),
          prompt: prompt,
        });
        setNotToDoTitle(text);
      } catch (error) {
        console.error("Error generating NotToDo:", error);
      }
    };

    generateNotToDo();
  }, [title]);

  const handleDelete = async () => {
    await useDeleteToDo(id, addedToDo, setAddedToDo);
  };

  const handleCompleted = async () => {
    const newCompleted = !notToDoCompleted;
    setNotToDoCompleted(newCompleted);

    await useCompleted(id, newCompleted, addedToDo, setAddedToDo);
  };

  return (
    <div
      key={id}
      className="flex items-center m-10 bg-[#fce4ec] rounded-lg text-[#D81B60]"
    >
      <button onClick={() => handleCompleted()}>
        {notToDoCompleted ? "✅" : "❌"}
      </button>
      <h1 className={`text-xl m-3 ${notToDoCompleted ? "line-through" : ""}`}>
        {notToDoTitle || "Loading..."}
      </h1>
      <Trash className="m-2 hover:cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default NotToDo;
