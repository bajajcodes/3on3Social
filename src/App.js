import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, Navigation, Sidebar } from "components";
import { checkIsNavigationAndSidebarRequired, RouteSwitch } from "utils";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const isNavigationAndSidebarRequired = checkIsNavigationAndSidebarRequired(
    location.pathname
  );

  return (
    <div
      className={`app bg-primary-background lg:grid-rows-[max-content_4fr_max-content] ${
        !isNavigationAndSidebarRequired
          ? "lg:grid-cols-[auto_4fr_auto]"
          : "lg:grid-cols-[1fr_4fr_1fr]"
      }`}
    >
      <Header />
      {isNavigationAndSidebarRequired && <Navigation />}
      <RouteSwitch />
      {isNavigationAndSidebarRequired && <Sidebar />}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export { App };
