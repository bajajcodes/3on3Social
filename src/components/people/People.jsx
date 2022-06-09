import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";

function People({ info, isRowWise = false }) {
  const { profileImageUrl, name, username } = info;
  return (
    <div
      className={`p-2  bg-white gap-1 lg:gap-2 ${
        isRowWise ? "flex" : "grid text-center"
      } place-items-center `}
    >
      <ProfilePhoto source={profileImageUrl} />
      <DisplayName name={name} username={username} isBaseSize />
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
