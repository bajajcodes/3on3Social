import { EditIcon, DeleteIcon } from "icons";
import { openModal, deletePost } from "features";
import { useDispatch } from "react-redux";

function PostUpdateModal({
  display,
  togglePostModalDisplay,
  postId,
  postInfo,
}) {
  const dispatch = useDispatch();

  function dispatchDeletePost(event) {
    event.stopPropagation();
    dispatch(deletePost(postId));
    togglePostModalDisplay();
  }

  async function dispatchEditPost(event) {
    event.stopPropagation();
    dispatch(
      openModal({
        info: postInfo,
        postId,
      })
    );
    togglePostModalDisplay();
  }

  return (
    <div
      className={`bg-primary-background w-max grid gap-2 p-2 border-solid border-fill-background border-2 absolute right-0 top-3/4 ${display}`}
    >
      <div
        role="button"
        onClick={(e) => dispatchEditPost(e)}
        className="flex place-items-center font-semibold hover:text-primary-cta"
      >
        <span>
          <EditIcon />
        </span>
        <span>Edit</span>
      </div>
      <div
        role="button"
        onClick={(e) => dispatchDeletePost(e)}
        className="flex place-items-center font-semibold hover:text-red-500"
      >
        <span>
          <DeleteIcon />
        </span>
        <span>Delete</span>
      </div>
    </div>
  );
}

export { PostUpdateModal };
