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
        alert("User not found. Please check your email.");
      } else if (response.status === 401) {
        alert("Invalid password. Please try again.");
      } else {
        alert(`Error: ${errorData.message}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error logging in: ${error.message}`);
    } else {
      alert("An unexpected error occurred.");
    }
  }
};
