import { useUserIdFromToken } from "./indexs.ts";

export const useCompleted = async (
  id: number,
  toDocompleted: boolean,
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
          completed: toDocompleted,
        }),
      }
    );

    if (response.ok) {
      /* alert("ToDo updated"); */
      setAddedToDo(!addedToDo);
    } else {
      console.error("Error al actualizar la tarea:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red al actualizar la tarea:", error);
  }
};
