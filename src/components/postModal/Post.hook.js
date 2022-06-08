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

function usePostModal(editPostModalOpened) {
  const { uploadImage } = useFirebase();
  const { uid } = useSelector((state) => state.auth);
  const postId = useSelector((state) => state.postModal.postId);
  const dispatch = useDispatch();

  function createPostInfo(uid, imageUrl, content) {
    return {
      userId: uid,
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
        const postInfo = createPostInfo(uid, imageUrl, content);
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
      if (isFormHasChanges.current) {
        const formData = new FormData(event.target);
        const content = formData.get("content");
        let file = "";
        if (formData.has("file")) {
          file = formData.get("file");
        }
        editPostModalOpened();
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
