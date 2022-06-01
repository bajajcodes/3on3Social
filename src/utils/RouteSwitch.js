import { Routes, Route } from "react-router-dom";
import { Landing, Home } from "pages";
import { Signup } from "features";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<div className="main">Not Found</div>} />
    </Routes>
  );
}

export { RouteSwitch };
