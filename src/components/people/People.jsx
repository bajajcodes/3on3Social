import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { useNavigate } from "react-router-dom";

function People({ info, isRowWise = false }) {
  const { profileImageUrl, name, username, uid } = info;
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(`/profile/${uid}`);
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
      >
        Follow +
      </span>
    </div>
  );
}

export { People };
