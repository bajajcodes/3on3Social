import { Toast } from "utils";
import { updatedUserProfile, updateProfileState } from "features";
import { useFirebase } from "hooks";
import { useSelector, useDispatch } from "react-redux";

function useEditProfile(closeModal, editProfileFormOpened) {
  const { uploadImage } = useFirebase();
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function postUpdatedUserInfo(userInfo) {
    try {
      dispatch(updateProfileState({ status: "updating" }));
      if (userInfo.file.size !== 0) {
        const url = await uploadImage(
          userInfo.file,
          userInfo.uid,
          "profileImages"
        );
        userInfo.profileImageUrl = url;
      }
      delete userInfo.file;
      dispatch(updatedUserProfile(userInfo));
    } catch (error) {
      Toast.error(error.message);
    }
  }

  async function validateAndUpdateProfileInfo(event, isFormHasChanges) {
    const userInfo = {
      uid: uid,
    };
    try {
      event.stopPropagation();
      event.preventDefault();
      if (isFormHasChanges.current) {
        const formData = new FormData(event.target);
        for (let [k, v] of formData.entries()) {
          userInfo[k] = v;
        }
        editProfileFormOpened();
        await postUpdatedUserInfo(userInfo);
      }
      closeModal();
    } catch (error) {
      Toast.error(error.message);
    }
  }

  return { validateAndUpdateProfileInfo };
}

export { useEditProfile };
