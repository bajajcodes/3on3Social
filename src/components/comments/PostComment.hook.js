import { Toast } from "utils";
import { updateCommentStatus, postComment, updateComment } from "features";
import { serverTimestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function usePostComment() {
  const { uid, isLoggedIn } = useSelector((state) => state.auth);
  const { username, name, profileImageUrl } = useSelector(
    (state) => state.profile.userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function createCommentInfo(userInfo, postId, content) {
    return {
      userInfo,
      postId,
      content,
      createdAt: serverTimestamp(),
    };
  }

  async function submitComment(content, postId) {
    try {
      dispatch(updateCommentStatus({ status: "updating" }));
      const commentInfo = createCommentInfo(
        { uid, username, name, profileImageUrl },
        postId,
        content
      );
      dispatch(postComment(commentInfo));
    } catch (error) {
      Toast.error(error.message);
    }
  }

  async function validateAndPostComment(
    event,
    isFormHasChanges,
    postId,
    resetFormInputs
  ) {
    try {
      event.stopPropagation();
      event.preventDefault();
      if (!isLoggedIn) {
        navigate("/login", { state: { from: location.pathname } });
      }
      if (isFormHasChanges.current) {
        const formData = new FormData(event.target);
        const content = formData.get("content");
        await submitComment(content, postId);
      }
      isFormHasChanges.current = false;
      resetFormInputs();
    } catch (error) {
      Toast.error(error.message);
    }
  }

  async function validateAndUpdateComment(
    event,
    isFormHasChanges,
    resetFormInputs,
    commentId,
    toggleEditComment
  ) {
    try {
      event.stopPropagation();
      event.preventDefault();
      if (!isLoggedIn) {
        navigate("/login", { state: { from: location.pathname } });
      }
      if (isFormHasChanges.current) {
        const formData = new FormData(event.target);
        const content = formData.get("content");
        dispatch(updateComment({ commentId, commentInfo: { content } }));
      }
      isFormHasChanges.current = false;
      resetFormInputs();
      toggleEditComment();
    } catch (error) {
      Toast.error(error.message);
    }
  }

  return { validateAndPostComment, validateAndUpdateComment };
}

export { usePostComment };
