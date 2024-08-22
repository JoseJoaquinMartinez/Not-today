import Swal from "sweetalert2";

export const useLogin = async (
  email: string,
  password: string,
  navigate: any
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      navigate(`/not-today`);
    } else {
      const errorData = await response.json();
      if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User not found",
          text: "Please check your email.",
          background: "#f9e2af",
          color: "#855eda",
          customClass: {
            popup: "my-pixel-alert",
          },
        });
      } else if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid password",
          text: "Please try again.",
          background: "#f9e2af",
          color: "#855eda",
          customClass: {
            popup: "my-pixel-alert",
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message,
          background: "#f9e2af",
          color: "#855eda",
          customClass: {
            popup: "my-pixel-alert",
          },
        });
      }
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
        background: "#f9e2af",
        color: "#855eda",
        customClass: {
          popup: "my-pixel-alert",
        },
      });
    }
  }
};
