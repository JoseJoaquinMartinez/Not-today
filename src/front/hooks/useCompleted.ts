import Swal from "sweetalert2";
import { useUserIdFromToken } from "./indexs.ts";

export const useCompleted = async (
  id: number,
  newCompleted: boolean,
  addedToDo: boolean,
  setAddedToDo: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const userId = useUserIdFromToken();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/updateToDo/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id,
          completed: newCompleted,
        }),
      }
    );

    if (response.ok) {
      setAddedToDo(!addedToDo);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.statusText,
        background: "#f9e2af",
        color: "#855eda",
        customClass: { popup: "my-pixel-alert" },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        background: "#f9e2af",
        color: "#855eda",
        customClass: { popup: "my-pixel-alert" },
      });
    }
  }
};
