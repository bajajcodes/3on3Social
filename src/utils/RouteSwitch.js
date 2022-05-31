import { Routes, Route } from "react-router-dom";
import { Landing, Home } from "pages";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<div className="main">Not Found</div>} />
    </Routes>
  );
}

export { RouteSwitch };
