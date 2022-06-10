import { Button } from "components";

function EditProfileButton({ onClickHandler }) {
  return (
    <Button
      name="editProfile"
      text="Edit Profile"
      onClickHandler={onClickHandler}
      extraClasses={"w-32"}
    />
  );
}

function FollowButton({ onClickHandler }) {
  return (
    <Button
      name="follow"
      text="Follow"
      isPrimary
      onClickHandler={onClickHandler}
      extraClasses={"w-32"}
    />
  );
}

function FollowingButton({ onClickHandler }) {
  return (
    <Button
      name="following"
      text="Following"
      onClickHandler={onClickHandler}
      extraClasses={"w-32"}
    />
  );
}

function UnfollowButton({ onClickHandler }) {
  return (
    <Button
      name="unfollow"
      text="Unfollow"
      isSecondary
      onClickHandler={onClickHandler}
      extraClasses={"w-32"}
    />
  );
}

export { EditProfileButton, FollowButton, FollowingButton, UnfollowButton };
