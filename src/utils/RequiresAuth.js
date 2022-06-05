import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequiresAuth({ children }) {
  const location = useLocation();
  const from = location.pathname;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from }} replace />
  );
}

export { RequiresAuth };
