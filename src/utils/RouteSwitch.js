import { Routes, Route } from "react-router-dom";
import { Landing, Home, Profile } from "pages";
import { Signup, Login } from "features";
import { CheckAuth } from "./CheckAuth";
import { RequiresAuth } from "./RequiresAuth";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/signup"
        element={
          <CheckAuth>
            <Signup />
          </CheckAuth>
        }
      />
      <Route
        path="/login"
        element={
          <CheckAuth>
            <Login />
          </CheckAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequiresAuth>
            <Profile />
          </RequiresAuth>
        }
      />
      <Route path="*" element={<div className="main">Not Found</div>} />
    </Routes>
  );
}

export { RouteSwitch };
