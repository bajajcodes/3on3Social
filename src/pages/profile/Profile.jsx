import { getDate } from "./Profile.helpers";
import {
  Button,
  DisplayName,
  ProfilePhoto,
  EditProfileModal,
  Loader,
  Post,
} from "components";
import { Toast } from "utils";
import { db } from "firebaseLocal";
import {
  updateProfileState,
  updatePostStatus,
  updatePostsArray,
} from "features";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function Profile() {
  const [displayEditProfileModal, setDisplayEditProfileModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { status, userInfo } = useSelector((state) => state.profile);
  const {
    status: postStatus,
    posts,
    message: postMessage,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  function showEditProfileModal() {
    setDisplayEditProfileModal(true);
  }

  function setDisplayEditProfileModalToInitialState() {
    setDisplayEditProfileModal(false);
  }

  useEffect(() => {
    dispatch(
      updateProfileState({
        status: "loading",
      })
    );
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.uid),
      (snapshot) => {
        dispatch(
          updateProfileState({
            status: "success",
            userInfo: snapshot.data(),
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
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(
      updatePostStatus({
        status: "loading",
      })
    );
    const userPostsQuery = query(
      collection(db, "posts"),
      where("userId", "==", auth.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      userPostsQuery,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((q) =>
          posts.push({ ...q.data(), id: q.id, createdAt: getDate(q.data()) })
        );
        dispatch(
          updatePostsArray({
            status: "success",
            posts,
          })
        );
      },
      (error) => {
        Toast.error(error.message);
        dispatch(
          updatePostsArray({
            status: "failed",
            posts: [],
          })
        );
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (postStatus === "success" && postMessage) {
      Toast.info(postMessage);
    }
  }, [postMessage, postStatus]);

  return (
    <>
      <main className="main grid gap-2 p-4 m-auto z-0">
        <section className="w-full max-w-xl grid gap-2 place-items-center text-center">
          {status === "success" && (
            <>
              <ProfilePhoto source={userInfo.profileImageUrl} isLarge={true} />
              <DisplayName name={userInfo.name} username={userInfo.username} />
              <Button
                name="editProfile"
                text="Edit Profile"
                onClickHandler={showEditProfileModal}
              />
              {userInfo?.bio && <p className="max-h-">{userInfo.bio}</p>}
              {userInfo?.website && (
                <a
                  target="_blank"
                  href={`${userInfo.website}`}
                  className="text-red-500 hover:underline"
                  rel="noreferrer"
                >
                  {userInfo.website}
                </a>
              )}
              <section className="w-full max-w-lg h-max text-2xl bg-white px-2 py-1 grid gap-4 place-items-center place-content-center lg:grid-cols-3 lg:h-[7.5rem]">
                <div>
                  <h4 className="font-bold">{userInfo.following.length}</h4>
                  <h4>Following</h4>
                </div>
                <div>
                  <h4 className="font-bold">{userInfo.posts.length}</h4>
                  <h4>Posts</h4>
                </div>
                <div>
                  <h4 className="font-bold">{userInfo.followers.length}</h4>
                  <h4>Followers</h4>
                </div>
              </section>
            </>
          )}

          <div className="relative">
            {status === "loading" && <Loader message="Profile Loading..." />}
          </div>
        </section>
        <section className="w-full max-w-xl grid gap-2">
          {postStatus === "success" && posts.length !== 0 && (
            <h1 className="text-4xl font-medium">Your Posts</h1>
          )}
          {postStatus === "success" && (
            <section>
              {posts &&
                posts.map((post) => (
                  <Post
                    key={post.id}
                    postInfo={{
                      profileImageUrl: userInfo.profileImageUrl,
                      imageUrl: post.imageUrl,
                      name: userInfo.name,
                      username: userInfo.username,
                      createdAt: post.createdAt,
                      content: post.content,
                      id: post.id,
                    }}
                  />
                ))}
              {posts && posts.length === 0 && (
                <h3 className="text-4xl font-medium">
                  You have not written any posts yet.
                </h3>
              )}
            </section>
          )}
          <div className="relative">
            {postStatus === "loading" && <Loader message="Posts Loading..." />}
          </div>
        </section>
      </main>
      {displayEditProfileModal && (
        <EditProfileModal
          show={displayEditProfileModal}
          resetDisplay={setDisplayEditProfileModalToInitialState}
          info={userInfo}
        />
      )}
    </>
  );
}

export { Profile };
