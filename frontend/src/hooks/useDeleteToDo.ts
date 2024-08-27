import Swal from "sweetalert2";
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
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
