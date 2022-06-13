import { getDate, Toast, filterPosts } from "utils";
import { db } from "firebaseLocal";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";

function useExplore() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState([]);
  const [usersStatus, setUsersStatus] = useState("idle");
  const [postsStatus, setPostsStatus] = useState("idle");
  const [commentsStatus, setCommentsStatus] = useState("idle");
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
    setPostsStatus("loading");
    const userCommentsQuery = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(
      userCommentsQuery,
      (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((q) =>
          comments.push({
            ...q.data(),
            id: q.id,
            createdAt: getDate(q.data()),
          })
        );
        setComments(comments);
        setCommentsStatus("success");
      },
      (error) => {
        Toast.error(error.message);
        setCommentsStatus("failed");
      }
    );
    return () => {
      unsubscribe();
      setCommentsStatus("idle");
      setComments([]);
    };
  }, []);

  useEffect(() => {
    if (
      usersStatus === "success" &&
      postsStatus === "success" &&
      commentsStatus === "success"
    ) {
      const filteredPosts = posts.filter((post) =>
        users.find((user) => user.username === post.username)
      );
      const content = filteredPosts.map((post) => {
        const user = users.find((user) => user.username === post.username);
        const filteredComments = comments.filter(
          (comment) => comment.postId === post.id
        );
        const sortedComments = filterPosts("Newest", filteredComments);
        if (user) {
          return {
            ...post,
            uid: user.id,
            username: user.username,
            name: user.name,
            profileImageUrl: user.profileImageUrl,
            bookmarks: post?.bookmarks ?? [],
            comments: sortedComments,
          };
        } else {
          console.info({ post });
        }
      });
      setContent(content);
      setStatus("success");
    } else {
      setStatus("loading");
    }
  }, [usersStatus, postsStatus, commentsStatus, users, posts, comments]);

  return { content, status };
}

export { useExplore };
