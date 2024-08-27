import Swal from "sweetalert2";
import { useUserIdFromToken } from "./indexs.ts";

export const usePostToDo = async (
  newToDo: string,
  setNewToDo: React.Dispatch<React.SetStateAction<string>>,
  setAddedToDo: React.Dispatch<React.SetStateAction<boolean>>,
  addedToDo: boolean
): Promise<void> => {
  if (newToDo === "") return;
  try {
    const userId = useUserIdFromToken();

    const sendNewTodo = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/newToDo/${userId}`,
      {
        method: "POST",
        credentials: "include",
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
      setNewToDo("");
      setAddedToDo(!addedToDo);
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
