import { useState, useEffect } from "react";

import Swal from "sweetalert2";

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
        const prompt = `
      Dado el siguiente texto: "${title}", genera una excusa divertida y original 
      para procrastinar esta tarea. La respuesta debe ser únicamente la excusa, sin ninguna introducción, 
      explicación, o detalles adicionales. La excusa debe estar en el mismo idioma que la tarea y tener un 
      máximo de 120 caracteres.`;

        const { text } = await generateText({
          model: groq("llama3-8b-8192"),
          prompt: prompt,
        });
        if (text) {
          setNotToDoTitle(text);
        } else {
          setNotToDoTitle("I'm too lazy to do this right now.");
        }
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
            background: "#f9e2af",
            color: "#855eda",
            customClass: {
              popup: "my-pixel-alert",
            },
          });
        }
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
