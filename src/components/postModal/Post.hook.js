import { Toast } from "utils";
import {
  updatePostStatus,
  createNewPost,
  updatePost,
  closeModal,
} from "features";
import { useFirebase } from "hooks";
import { serverTimestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function usePostModal(editPostModalOpened) {
  const { uploadImage } = useFirebase();
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const username = useSelector((state) => state.profile.userInfo.username);
  const postId = useSelector((state) => state.postModal.postId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function createPostInfo(username, imageUrl, content) {
    return {
      username: username,
      comments: [],
      likes: [],
      imageUrl,
      createdAt: serverTimestamp(),
      content,
    };
  }

  async function submitPost(content = "", file) {
    try {
      dispatch(updatePostStatus({ status: "updating" }));
      let imageUrl = "";
      if (file.size !== 0) {
        imageUrl = await uploadImage(file, postId, "postImages");
      }
      if (postId) {
        const postInfo =
          file.size !== 0
            ? {
                content,
                imageUrl,
              }
            : { content };
        dispatch(updatePost({ postId, postInfo }));
      } else {
        const postInfo = createPostInfo(username, imageUrl, content);
        dispatch(createNewPost({ uid, postInfo }));
      }
    } catch (error) {
      Toast.error(error.message);
    }
  }

  async function validateAndCreateNewPost(event, isFormHasChanges) {
    try {
      event.stopPropagation();
      event.preventDefault();
      if (!isLoggedIn) {
        navigate("/login", { state: { from: location.pathname } });
      }
      if (isFormHasChanges.current) {
        const formData = new FormData(event.target);
        const content = formData.get("content");
        let file = "";
        if (formData.has("file")) {
          file = formData.get("file");
        }
        if(editPostModalOpened){
          editPostModalOpened();
        }
        await submitPost(content, file);
      }
      dispatch(closeModal());
    } catch (error) {
      Toast.error(error.message);
    }
  }

  return { validateAndCreateNewPost };
}

export { usePostModal };
