import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, Navigation, Sidebar, PostModal } from "components";
import {
  checkIsNavigationAndSidebarRequired,
  RouteSwitch,
  Toast,
  getDate,
} from "utils";
import { loggedIn } from "features";
import { auth } from "firebaseLocal";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { db } from "firebaseLocal";
import { updateProfileState } from "features";
import { doc, onSnapshot } from "firebase/firestore";

function App() {
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const { show } = useSelector((state) => state.postModal);
  const { status: postStatus, message: postMessage } = useSelector(
    (state) => state.post
  );
  const { status: profileStatus, message: profileMessage } = useSelector(
    (state) => state.profile
  );
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
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    if (isLoggedIn) {
      dispatch(
        updateProfileState({
          status: "loading",
        })
      );
      unsubscribe = onSnapshot(
        doc(db, "users", uid),
        (snapshot) => {
          dispatch(
            updateProfileState({
              status: "success",
              userInfo: {
                ...snapshot.data(),
                createdAt: getDate(snapshot.data()),
                uid,
              },
            })
          );
        },
        (error) => {
          Toast.error(error.message);
          dispatch(
            updateProfileState({
              status: "failed",
            })
          );
        }
      );
    }
    return () => unsubscribe && unsubscribe();
  }, [isLoggedIn]);

  useEffect(() => {
    if (postMessage && postMessage !== "Loading") {
      if (postStatus === "failed") Toast.error(postMessage);
      else if (postStatus === "success") Toast.success(postMessage);
    }
  }, [postMessage, postStatus]);

  useEffect(() => {
    if (profileStatus === "failed") {
      Toast.error(profileMessage);
    }
  }, [profileMessage, profileStatus]);

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
