export const useSingup = async (
  email: string,
  password: string,
  navigate: any
) => {
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
  }
};
