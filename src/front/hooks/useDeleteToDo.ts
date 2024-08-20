export const useDeleteToDo = async (
  id: number,
  addedToDo: boolean,
  setAddedToDo: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/ToDo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      /* alert("ToDo deleted"); */
      setAddedToDo(!addedToDo);
    } else {
      console.error("Error al eliminar la tarea:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red al eliminar la tarea:", error);
  }
};
