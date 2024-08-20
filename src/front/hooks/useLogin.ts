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
    }
  } catch (error) {
    console.log(error);
  }
};
