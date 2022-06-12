import { getDate, Toast } from "utils";
import { db } from "firebaseLocal";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { followUser, unFollowUser } from "features";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function useProfile() {
  const location = useLocation();
  const [userInfoStatus, setUserInfoStatus] = useState("idle");
  const [displayEditProfileModal, setDisplayEditProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [postStatus, setPostStatus] = useState("idle");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const following =
    useSelector((state) => state.profile.userInfo?.following) ?? [];
  const username = useSelector((state) => state.profile.userInfo.username);
  const profileUid = location.pathname.split("/")[2];

  useEffect(() => {
    const uid = location.pathname.split("/")[2];
    setUserInfoStatus("loading");
    const unsubscribe = onSnapshot(
      doc(db, "users", uid),
      (snapshot) => {
        setUserInfoStatus("success");
        const userInfo = {
          ...snapshot.data(),
          createdAt: getDate(snapshot.data()),
          uid: snapshot.id,
        };
        setUserInfo(userInfo);
      },
      (error) => {
        Toast.error(error.message);
        setUserInfoStatus("failed");
      }
    );
    return () => {
      unsubscribe();
      setUserInfoStatus("idle");
      setUserInfo({});
    };
  }, [location.pathname]);

  useEffect(() => {
    setPostStatus("loading");
    let unsubscribe = null;
    if (userInfoStatus === "success") {
      const username = userInfo.username;
      const userPostsQuery = query(
        collection(db, "posts"),
        where("username", "==", username),
        orderBy("createdAt", "desc")
      );
      unsubscribe = onSnapshot(
        userPostsQuery,
        (querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((q) =>
            posts.push({
              ...q.data(),
              id: q.id,
              createdAt: getDate(q.data()),
            })
          );
          setPosts(posts);
          setPostStatus("success");
        },
        (error) => {
          Toast.error(error.message);
          setPostStatus("failed");
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
        setPostStatus("idle");
        setPosts([]);
      }
    };
  }, [userInfoStatus]);

  function dispatchFollowUser() {
    if (uid) {
      dispatch(
        followUser({
          follower: { uid, username },
          following: { uid: userInfo.uid, username: userInfo.username },
        })
      );
    } else {
      navigate("/login", { state: { from: `/profile/${profileUid}` } });
    }
  }

  function dispatchUnfollowUser() {
    if (uid) {
      dispatch(
        unFollowUser({
          follower: { uid, username },
          following: { uid: userInfo.uid, username: userInfo.username },
        })
      );
    } else {
      navigate("/login", { state: { from: `/profile/${profileUid}` } });
    }
  }

  function showEditProfileModal() {
    setDisplayEditProfileModal(true);
  }

  function setDisplayEditProfileModalToInitialState() {
    setDisplayEditProfileModal(false);
  }

  return {
    uid,
    following,
    userInfo,
    userInfoStatus,
    posts,
    postStatus,
    dispatchFollowUser,
    dispatchUnfollowUser,
    displayEditProfileModal,
    showEditProfileModal,
    setDisplayEditProfileModalToInitialState
  };
}

export { useProfile };
