import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, Navigation, Sidebar, PostModal } from "components";
import { checkIsNavigationAndSidebarRequired, RouteSwitch, Toast } from "utils";
import { loggedIn } from "features";
import { auth } from "firebaseLocal";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const { show } = useSelector((state) => state.postModal);
  const location = useLocation();
  const dispatch = useDispatch();

  const isNavigationAndSidebarRequired = checkIsNavigationAndSidebarRequired(
    location.pathname
  );

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loggedIn({ uid: user.uid }));
        Toast.success("Successful Authenticated");
      }
    });
    return unsubscribe;
  }, []);

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
      {show && <PostModal />}
    </div>
  );
}

export { App };
