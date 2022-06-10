import { Routes, Route } from "react-router-dom";
import { Landing, Home, Profile, People } from "pages";
import { Signup, Login } from "features";
import { CheckAuth } from "./CheckAuth";

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
      <Route path="/profile/:uid" element={<Profile />} />
      <Route path="/people" element={<People />} />
      <Route path="*" element={<div className="main">Not Found</div>} />
    </Routes>
  );
}

export { RouteSwitch };
