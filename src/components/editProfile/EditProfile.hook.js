import { Toast } from "utils";
import { updatedUserProfile, updateProfileState } from "features";
import { storage } from "firebaseLocal";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";

function useEditProfile(closeModal, editProfileFormOpened) {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function uploadImage(file, uid) {
    try {
      const storageRef = ref(storage, `/profileImages/${uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const snapshotRef = snapshot.ref;
      const url = await getDownloadURL(snapshotRef);
      return url;
    } catch (error) {
      Toast.error(error.message);
    }
  }

  async function postUpdatedUserInfo(userInfo) {
    try {
      dispatch(updateProfileState({ status: "updating" }));
      if (userInfo.file.size !== 0) {
        const url = await uploadImage(userInfo.file, userInfo.uid);
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
