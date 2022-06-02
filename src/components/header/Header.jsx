import { Hero } from "../hero/Hero";
import { LoginIcon, LogoutIcon } from "icons";
import { Toast } from "utils";
import { logoutUser } from "features";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="header h-20 relative p-2 flex place-items-center bg-white border-b-4 border-solid border-b-black">
      <Hero />
      <nav className="ml-auto">
        {!auth.isLoggedIn && (
          <div
            className="grid place-items-center text-lg font-bold cursor-pointer hover:text-primary-cta"
            onClick={() => navigate("/login")}
          >
            <LoginIcon />
            <span>Login</span>
          </div>
        )}
        {auth.isLoggedIn && (
          <div
            className="grid place-items-center text-lg font-bold cursor-pointer hover:text-primary-cta"
            onClick={() => {
              Toast.info("Successful Logout");
              dispatch(logoutUser());
            }}
          >
            <LogoutIcon />
            <span>Logout</span>
          </div>
        )}
      </nav>
    </header>
  );
}

export { Header };
