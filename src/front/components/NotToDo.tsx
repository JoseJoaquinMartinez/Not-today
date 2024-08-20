import { useState, useEffect } from "react";

import type { ToDoType, ToDoInputProps } from "./types.d.ts";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const NotToDo = ({ id, title, completed }: ToDoType & ToDoInputProps) => {
  const [notToDoTitle, setNotToDoTitle] = useState<string>("");

  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: import.meta.env.VITE_GROQ_KEY,
  });

  useEffect(() => {
    const generateNotToDo = async () => {
      try {
        const prompt = `te gusta procastinar, quiero que transformes la siguiente tarea ${title} en una excusa divertida y original. La respuesta debe ser solo la excusa sin ninguna introducción ni explicación adicional y maximo 120 caracteres.  Contesta en el mismo idioma que este la tarea`;
        const { text } = await generateText({
          model: groq("llama3-8b-8192"),
          prompt: prompt,
        });
        setNotToDoTitle(text);
      } catch (error) {
        console.error("Error generating NotToDo:", error);
      }
    };

    generateNotToDo();
  }, [title]);

  return (
    <div
      key={id}
      className="flex items-center m-10 bg-[#fce4ec] rounded-lg text-[#D81B60]"
    >
      <img
        className="size-24 rounded-full self-center z-10"
        src="../../../public/ROBOT.jpg"
      ></img>
      <h1 className={`text-xl m-3 ${completed ? "line-through" : ""}`}>
        {notToDoTitle || "Loading..."}
      </h1>
    </div>
  );
};

export default NotToDo;
