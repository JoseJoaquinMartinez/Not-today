import { jwtDecode } from "jwt-decode";

import type { decodedToken } from "../components/types";

export const usePostToDo = async (
  newToDo: string,
  setNewToDo: React.Dispatch<React.SetStateAction<string>>,
  setAddedToDo: React.Dispatch<React.SetStateAction<boolean>>,
  addedToDo: boolean
): Promise<void> => {
  if (newToDo === "") return;
  try {
    const decodedToken: decodedToken = jwtDecode(
      sessionStorage.getItem("token")!
    );
    const userId = decodedToken.userId;

    const sendNewTodo = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/newToDo/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: newToDo,
        }),
      }
    );
    if (sendNewTodo.ok) {
      alert("Todo agregado");
      setNewToDo("");
      setAddedToDo(!addedToDo);
    }
  } catch (error) {
    alert(`Error al agregar el todo ${error}}`);
  }
};
