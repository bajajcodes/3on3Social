import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { PostUpdateModal } from "./PostUpdateModal";
import {
  EllipseIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  BookmarksIcon,
} from "icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ postInfo }) {
  const [updatePostModalDisplay, setUpdatePostModalDisplay] = useState("");
  const navigate = useNavigate();

  function togglePostModalDisplay() {
    setUpdatePostModalDisplay((p) => (p === "block" ? "hidden" : "block"));
  }

  function onClickHandler() {
    navigate(`/profile/${postInfo.uid}`);
  }

  return (
    <article className="p-4 bg-white w-full max-w-xl grid grid-cols-[max-content_1fr] gap-2 mb-4">
      <ProfilePhoto
        extraClasses="lg:w-16 lg:h-16"
        source={postInfo.profileImageUrl}
        onClickHandler={() => onClickHandler()}
      />
      <div>
        <div className="w-full flex flex-wrap place-items-center gap-2">
          <DisplayName
            name={postInfo.name}
            username={postInfo.username}
            isBaseSize
            extraClasses="lg:flex-row"
            onClickHandler={() => onClickHandler()}
          />
          <span>
            <span className="text-xl font-bold">·</span>
            <span>{postInfo.createdAt}</span>
          </span>
          <button
            className="ml-auto relative z-0"
            onClick={() => togglePostModalDisplay()}
          >
            <EllipseIcon />
            {updatePostModalDisplay && (
              <PostUpdateModal
                display={updatePostModalDisplay}
                togglePostModalDisplay={togglePostModalDisplay}
                postId={postInfo.id}
                postInfo={postInfo}
              />
            )}
          </button>
        </div>
        <pre className="text-base whitespace-pre-line break-words pre-formatting">
          {postInfo.content}
        </pre>
        {postInfo.imageUrl && (
          <img src={postInfo.imageUrl} className="h-52 m-auto" />
        )}
        <div className="flex flex-wrap place-items-center justify-between mt-2">
          <button>
            <LikeIcon />
          </button>
          <button>
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
    </article>
  );
}

export { Post };
