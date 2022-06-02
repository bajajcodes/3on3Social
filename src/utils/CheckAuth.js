import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const to = location.state?.from ?? "/home";
  return isLoggedIn ? <Navigate to={to} replace /> : children;
}

export { CheckAuth };
