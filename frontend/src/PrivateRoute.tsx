import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactElement => {
  const token = sessionStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
