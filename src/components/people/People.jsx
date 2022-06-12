import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { followUser } from "features";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function People({ info, isRowWise = false }) {
  const { username: followerUsername, uid: followerUid } = useSelector(
    (state) => state.profile.userInfo
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { profileImageUrl, name, username, uid } = info;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickHandler() {
    navigate(`/profile/${uid}`);
  }

  function dispatchFollowUser() {
    if (isLoggedIn) {
      dispatch(
        followUser({
          following: { username, uid },
          follower: { username: followerUsername, uid: followerUid },
        })
      );
    } else {
      navigate("/login");
    }
  }

  return (
    <div
      className={`p-2  bg-white gap-1 lg:gap-2 ${
        isRowWise ? "flex" : "grid text-center"
      } place-items-center `}
    >
      <ProfilePhoto
        source={profileImageUrl}
        onClickHandler={() => onClickHandler()}
      />
      <DisplayName
        name={name}
        username={username}
        isBaseSize
        onClickHandler={() => onClickHandler()}
      />
      <span
        role="button"
        className={`text-primary-cta hover:text-complementary font-semibold ${
          isRowWise ? "ml-auto" : ""
        }`}
        onClick={() => dispatchFollowUser()}
      >
        Follow +
      </span>
    </div>
  );
}

export { People };
