import { getDate, Toast, filterPosts } from "utils";
import { db } from "firebaseLocal";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useHome() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loggedInUserPosts, setLoggedInUserPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [usersStatus, setUsersStatus] = useState("idle");
  const [postsStatus, setPostsStatus] = useState("idle");
  const [loggedInUserPostsStatus, setLoggedInUserPostsStatus] =
    useState("idle");
  const [status, setStatus] = useState("loading");
  const { userInfo, status: loggedInProfileStatus } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    setPostsStatus("loading");
    let postsUnsubscribe = null;
    let postsQuery = null;
    if (loggedInProfileStatus === "success") {
      if (userInfo.following.length !== 0) {
        postsQuery = query(
          collection(db, "posts"),
          where("username", "in", [...userInfo.following])
        );
        postsUnsubscribe = onSnapshot(
          postsQuery,
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
            setPostsStatus("success");
          },
          (error) => {
            Toast.error(error.message);
            setPostsStatus("failed");
          }
        );
      } else {
        setPosts([]);
        setPostsStatus("success");
      }
    }
    return () => postsUnsubscribe && postsUnsubscribe();
  }, [loggedInProfileStatus]);

  useEffect(() => {
    setUsersStatus("loading");
    let usersUnsubscribe = null;
    let usersQuery = null;

    if (loggedInProfileStatus === "success") {
      if (userInfo.following.length !== 0) {
        usersQuery = query(
          collection(db, "users"),
          where("username", "in", [...userInfo.following])
        );
        usersUnsubscribe = onSnapshot(
          usersQuery,
          (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((q) => {
              users.push({
                ...q.data(),
                id: q.id,
                createdAt: getDate(q.data()),
              });
            });
            setUsers(users);
            setUsersStatus("success");
          },
          (error) => {
            Toast.error(error.message);
            setUsersStatus("failed");
          }
        );
      } else {
        setUsers([]);
        setUsersStatus("success");
      }
    }
    return () => usersUnsubscribe && usersUnsubscribe();
  }, [loggedInProfileStatus]);

  useEffect(() => {
    setLoggedInUserPostsStatus("loading");
    let loggedInUserPostsUnsubscribe = null;
    let loggedInUserPostsQuery = null;
    if (loggedInProfileStatus === "success") {
      loggedInUserPostsQuery = query(
        collection(db, "posts"),
        where("username", "==", userInfo.username)
      );

      loggedInUserPostsUnsubscribe = onSnapshot(
        loggedInUserPostsQuery,
        (querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((q) => {
            posts.push({
              ...q.data(),
              id: q.id,
              createdAt: getDate(q.data()),
            });
          });
          setLoggedInUserPosts(posts);
          setLoggedInUserPostsStatus("success");
        },
        (error) => {
          Toast.error(error.message);
          setLoggedInUserPostsStatus("failed");
        }
      );
    }
    return () => loggedInUserPostsUnsubscribe && loggedInUserPostsUnsubscribe();
  }, [loggedInProfileStatus]);

  async function updateContent() {
    if (
      usersStatus === "success" &&
      postsStatus === "success" &&
      loggedInUserPostsStatus === "success"
    ) {
      setStatus("loading");
      const allPosts = [].concat(posts, loggedInUserPosts);
      const allUsers = [].concat(users, userInfo);
      const content = allPosts.map((post) => {
        const user = allUsers.find((user) => user.username === post.username);
        return {
          ...post,
          uid: user?.id ?? user.uid,
          username: user.username,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
        };
      });
      setContent(filterPosts("Newest", content));
      setStatus("success");
    } else {
      setStatus("loading");
    }
  }

  useEffect(() => {
    updateContent();
  }, [
    usersStatus,
    postsStatus,
    loggedInUserPostsStatus,
    users,
    posts,
    loggedInUserPosts,
  ]);

  return { content, status };
}

export { useHome };
