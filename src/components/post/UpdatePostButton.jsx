import { PostUpdateModal } from "./PostUpdateModal";
import { EllipseIcon } from "icons";
import { useState } from "react";

function UpdatePostButton({ postInfo }) {
  const [updatePostModalDisplay, setUpdatePostModalDisplay] = useState("");

  function togglePostModalDisplay() {
    setUpdatePostModalDisplay((p) => (p === "block" ? "hidden" : "block"));
  }
  return (
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
  );
}

export { UpdatePostButton };
