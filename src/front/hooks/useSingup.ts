export const useSingup = async (
  email: string,
  password: string,
  navigate: any
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
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
      if (response.status === 400) {
        alert("Email already exists. Please try again.");
      } else {
        alert(`Error: ${errorData.message}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error singing up: ${error.message}`);
    } else {
      alert("An unexpected error occurred.");
    }
  }
};
