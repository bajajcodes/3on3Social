import { UpdatePostButton } from "./UpdatePostButton";
import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { PostComment } from "../comments/PostComment";
import { Comment } from "../comments/Comment";
import { LikeIcon, CommentIcon, ShareIcon, BookmarksIcon } from "icons";
import { parseDateToDMY } from "utils";
import { updatePost } from "features";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Post({ postInfo }) {
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const uid = useSelector((state) => state.auth?.uid);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function onClickHandler() {
    navigate(`/profile/${postInfo.uid}`);
  }

  function toggleCommentDisplay() {
    setShowComment((p) => !p);
  }

  function dispatchToggleLikePost() {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
    }
    let message = "";
    let likes = [];
    if (liked) {
      likes = postInfo.likes.filter((u) => u !== uid);
      message = "Post Disliked";
    } else {
      message = "Post Liked";
      likes = [...postInfo.likes, uid];
    }
    dispatch(
      updatePost({
        postId: postInfo.id,
        postInfo: { likes },
        message,
      })
    );
  }

  useEffect(() => {
    const liked = postInfo.likes.find((u) => u === uid) ? true : false;
    setLiked(liked);
  }, [postInfo.likes]);

  return (
    <article className="p-4 bg-white w-full max-w-xl grid gap-2 mb-4">
      <div className="grid grid-cols-[max-content_1fr] gap-2">
        <ProfilePhoto
          extraClasses="lg:w-16 lg:h-16"
          source={postInfo.profileImageUrl}
          onClickHandler={() => onClickHandler()}
        />
        <div>
          <div className="w-full flex flex-wrap  gap-2">
            <DisplayName
              name={postInfo.name}
              username={postInfo.username}
              isBaseSize
              extraClasses="lg:flex-row"
              onClickHandler={() => onClickHandler()}
            />
            <span>
              <span className="text-xl font-bold">·</span>
              <span>{parseDateToDMY(postInfo.createdAt)}</span>
            </span>
            {uid === postInfo.uid && <UpdatePostButton postInfo={postInfo} />}
          </div>
          <pre className="text-base whitespace-pre-line break-words pre-formatting">
            {postInfo.content}
          </pre>
          {postInfo.imageUrl && (
            <img
              src={postInfo.imageUrl}
              className="m-auto max-h-96"
              loading="eager"
            />
          )}
          <div className="flex flex-wrap place-items-center justify-between mt-2">
            <button onClick={() => dispatchToggleLikePost()}>
              <LikeIcon liked={liked} />
            </button>
            <button onClick={() => toggleCommentDisplay()}>
              <CommentIcon />
            </button>
            <button>
              <ShareIcon />
            </button>
            <button>
              <BookmarksIcon />
            </button>
          </div>
        </div>
      </div>
      {showComment && <PostComment postId={postInfo.id} />}
      {showComment &&
        postInfo.comments.map((comment) => (
          <Comment
            key={comment.id}
            commentInfo={comment}
            replyingTo={postInfo.username}
            postId={postInfo.id}
          />
        ))}
    </article>
  );
}

export { Post };
