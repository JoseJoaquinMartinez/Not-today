import { jwtDecode } from "jwt-decode";

export const useUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode<any>(token!);
  const userId = decodedToken.userId;
  return userId;
};
