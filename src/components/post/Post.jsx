import { UpdatePostButton } from "./UpdatePostButton";
import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";
import { LikeIcon, CommentIcon, ShareIcon, BookmarksIcon } from "icons";
import { parseDateToDMY } from "utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ postInfo }) {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth?.uid);

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
