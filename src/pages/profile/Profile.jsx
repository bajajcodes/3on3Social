import {
  EditProfileButton,
  FollowButton,
  UnfollowButton,
} from "./Profile.buttons";
import { getDate } from "utils";
import {
  DisplayName,
  ProfilePhoto,
  EditProfileModal,
  Loader,
  Post,
} from "components";
import { Toast } from "utils";
import { db } from "firebaseLocal";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.uid);
  const profileUid = location.pathname.split("/")[2];
  const following =
    useSelector((state) => state.profile.userInfo?.following) ?? [];
  const [displayEditProfileModal, setDisplayEditProfileModal] = useState(false);
  const [userInfoStatus, setUserInfoStatus] = useState("idle");
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [postStatus, setPostStatus] = useState("idle");

  function showEditProfileModal() {
    setDisplayEditProfileModal(true);
  }

  function setDisplayEditProfileModalToInitialState() {
    setDisplayEditProfileModal(false);
  }

  function followUser() {
    if (uid) {
      // * Will be removed post follow/unfollow code addition
      console.log("Followed");
    } else {
      navigate("/login", { state: { from: `/profile/${profileUid}` } });
    }
  }

  function unfollowUser() {
    if (uid) {
      // * Will be removed post follow/unfollow code addition
      console.log("unfollowing");
    } else {
      navigate("/login", { state: { from: `/profile/${profileUid}` } });
    }
  }

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
    const uid = location.pathname.split("/")[2];
    setPostStatus("loading");
    const userPostsQuery = query(
      collection(db, "posts"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
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
        setPostStatus("success");
      },
      (error) => {
        Toast.error(error.message);
        setPostStatus("failed");
      }
    );
    return () => {
      unsubscribe();
      setPostStatus("idle");
      setPosts([]);
    };
  }, [location.pathname]);

  return (
    <>
      <main className="main grid gap-2 p-4 m-auto lg:mx-auto lg:my-0 z-0">
        <section className="w-full max-w-xl lg:w-[36rem] grid gap-2 place-items-center text-center">
          {userInfoStatus === "success" &&
            postStatus === "success" &&
            userInfo?.username && (
              <>
                <ProfilePhoto
                  source={userInfo.profileImageUrl}
                  isLarge={true}
                />
                <DisplayName
                  name={userInfo.name}
                  username={userInfo.username}
                />
                {uid === userInfo.uid && (
                  <EditProfileButton onClickHandler={showEditProfileModal} />
                )}
                {uid !== userInfo.uid &&
                  following.indexOf(userInfo.uid) === -1 && (
                    <FollowButton onClickHandler={followUser} />
                  )}
                {uid !== userInfo.uid &&
                  following.indexOf(userInfo.uid) !== -1 && (
                    <UnfollowButton onClickHandler={unfollowUser} />
                  )}
                {userInfo?.bio && <p className="">{userInfo.bio}</p>}
                {userInfo?.website && (
                  <a
                    target="_blank"
                    href={`${userInfo.website}`}
                    className="text-red-500 hover:underline w-full overflow-hidden text-ellipsis whitespace-nowrap"
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
            {(userInfoStatus === "loading" || postStatus === "loading") && (
              <Loader message="Profile Loading..." />
            )}
          </div>
        </section>
        <section className="w-full max-w-xl lg:w-[36rem] grid gap-2">
          {postStatus === "success" &&
            userInfoStatus === "success" &&
            posts.length !== 0 && (
              <h1 className="text-4xl font-medium">Your Posts</h1>
            )}
          {postStatus === "success" && userInfoStatus === "success" && (
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
                      uid,
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
