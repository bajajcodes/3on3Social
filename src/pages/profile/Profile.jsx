import {
  EditProfileButton,
  FollowButton,
  UnfollowButton,
} from "./Profile.buttons";
import { useProfile } from "./Profile.hook";
import {
  DisplayName,
  ProfilePhoto,
  EditProfileModal,
  Loader,
  Post,
} from "components";

function Profile() {
  const {
    uid,
    following,
    userInfo,
    posts,
    status,
    dispatchFollowUser,
    dispatchUnfollowUser,
    displayEditProfileModal,
    showEditProfileModal,
    setDisplayEditProfileModalToInitialState,
  } = useProfile();

  return (
    <>
      <main className="main grid gap-2 p-4 m-auto lg:mx-auto lg:my-0 z-0">
        <section className="w-full max-w-xl grid gap-2 place-items-center text-center">
          {status === "success" && userInfo?.username && (
            <>
              <ProfilePhoto source={userInfo.profileImageUrl} isLarge={true} />
              <DisplayName name={userInfo.name} username={userInfo.username} />
              {uid === userInfo.uid && (
                <EditProfileButton onClickHandler={showEditProfileModal} />
              )}
              {uid !== userInfo.uid &&
                following.indexOf(userInfo.username) === -1 && (
                  <FollowButton onClickHandler={dispatchFollowUser} />
                )}
              {uid !== userInfo.uid &&
                following.indexOf(userInfo.username) !== -1 && (
                  <UnfollowButton onClickHandler={dispatchUnfollowUser} />
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

          {status === "loading" && (
            <div className="relative">
              <Loader message="Profile Loading..." />
            </div>
          )}
        </section>
        <section className="w-full max-w-xl grid gap-2">
          {status === "success" && posts.length !== 0 && (
            <h1 className="text-4xl font-medium">
              {userInfo.uid === uid ? "Your Posts" : "Latest Posts"}
            </h1>
          )}
          {status === "success" && (
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
                      comments:post.comments,
                      id: post.id,
                      uid: userInfo.uid,
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
          {status === "loading" && (
            <div className="relative">
              <Loader message="Posts Loading..." />
            </div>
          )}
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
