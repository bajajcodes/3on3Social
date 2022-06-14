import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { PostComment } from "./PostComment";
import { EditIcon, DeleteIcon } from "icons";
import { parseDateToDMY } from "utils";
import { deleteComment } from "features";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Comment({ commentInfo, replyingTo, postId }) {
  const [edit, setEdit] = useState(false);
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function dispatchDeleteComment() {
    dispatch(deleteComment({ commentId: commentInfo.id, postId, uid }));
  }

  function toggleEditComment(event) {
    if (event) {
      event.stopPropagation();
    }
    setEdit((p) => !p);
  }

  function onClickHandler() {
    navigate(`/profile/${commentInfo.userInfo.uid}`);
  }

  return (
    <>
      {!edit && (
        <article className="bg-white w-full grid gap-2 grid-cols-[max-content_1fr]">
          <ProfilePhoto
            source={commentInfo.userInfo.profileImageUrl}
            onClickHandler={() => onClickHandler()}
          />
          <div>
            <div className="w-full flex flex-wrap place-items-center">
              <DisplayName
                name={commentInfo.userInfo.name}
                username={commentInfo.userInfo.username}
                isBaseSize
                extraClasses="lg:flex-row"
              />
              <span className="ml-2">
                <span className="text-xl font-bold">·</span>
                <span>{parseDateToDMY(commentInfo.createdAt)}</span>
              </span>
            </div>
            <div className="text-base">
              <span className="text-muted-text">Replying to</span>
              <span className="text-red-500 font-medium"> @{replyingTo}</span>
            </div>
            <div className="grid grid-cols-[1fr_max-content] items-center">
              <pre className="text-base whitespace-pre-line break-words pre-formatting">
                {commentInfo.content}
              </pre>
              {uid === commentInfo.userInfo.uid && (
                <div className="ml-auto">
                  <button
                    className="hover:text-primary-cta"
                    onClick={() => toggleEditComment()}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="hover:text-red-500"
                    onClick={() => dispatchDeleteComment()}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>
      )}
      {edit && (
        <PostComment
          postId={postId}
          edit={{
            show: edit,
            content: commentInfo.content,
            commentId: commentInfo.id,
            setEdit: toggleEditComment,
          }}
        />
      )}
    </>
  );
}

export { Comment };
