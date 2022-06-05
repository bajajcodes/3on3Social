import {
  Button,
  DisplayName,
  ProfilePhoto,
  EditProfileModal,
  Loader,
} from "components";
import { Toast } from "utils";
import { db } from "firebaseLocal";
import { doc, onSnapshot } from "firebase/firestore";
import { updateProfileState } from "features";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { info } from "autoprefixer";

function Profile() {
  const [displayEditProfileModal, setDisplayEditProfileModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { status, userInfo } = useSelector((state) => state.profile);
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

  return (
    <>
      <main className="main grid gap-2 p-4 m-auto">
        {status === "success" && (
          <section className="w-full max-w-2xl grid gap-2 place-items-center text-center">
            <ProfilePhoto source={userInfo.profileImageUrl} isLarge={true} />
            <DisplayName name={userInfo.name} username={userInfo.username} />
            <Button
              name="editProfile"
              text="Edit Profile"
              onClickHandler={showEditProfileModal}
            />
            {userInfo.bio && <p className="max-h-">{userInfo.bio}</p>}
            {userInfo.website && (
              <a
                target="_blank"
                rel="noreferrer"
                href={info.website}
                className="text-red-500 hover:underline"
              >
                {userInfo.website}
              </a>
            )}
            <section className="w-full max-w-lg h-[7.5rem] text-2xl bg-white px-2 py-1 flex justify-around flex-wrap gap-4 place-items-center">
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
          </section>
        )}
        {status === "success" && (
          <section className="w-full max-w-2xl grid gap-2">
            <h1 className="text-4xl font-medium">Your Posts</h1>
            <section>
              All Posts will come here, I am placeholder for future posts
              component
            </section>
          </section>
        )}
        {status === "loading" && <Loader message="Loading..." />}
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
