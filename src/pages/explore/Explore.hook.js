import { getDate, Toast } from "utils";
import { db } from "firebaseLocal";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";

function useExplore() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [usersStatus, setUsersStatus] = useState("idle");
  const [postsStatus, setPostsStatus] = useState("idle");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setPostsStatus("loading");
    const userPostsQuery = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(
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
        setPostsStatus("success");
      },
      (error) => {
        Toast.error(error.message);
        setPostsStatus("failed");
      }
    );
    return () => {
      unsubscribe();
      setPostsStatus("idle");
      setPosts([]);
    };
  }, []);

  useEffect(() => {
    setUsersStatus("loading");
    const userPostsQuery = query(collection(db, "users"));
    const unsubscribe = onSnapshot(
      userPostsQuery,
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
    return () => {
      unsubscribe();
      setUsersStatus("idle");
      setUsers([]);
    };
  }, []);

  useEffect(() => {
    if (usersStatus === "success" && postsStatus === "success") {
      const content = posts.map((post) => {
        const user = users.find((user) => user.username === post.username);
        return {
          ...post,
          uid: user.id,
          username: user.username,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
        };
      });
      setContent(content);
      setStatus("success");
    } else {
      setStatus("loading");
    }
  }, [usersStatus, postsStatus, users, posts]);

  return { content, status };
}

export { useExplore };
