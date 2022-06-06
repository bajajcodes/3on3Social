import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { DisplayName } from "../displayName/DisplayName";

function Post() {
  return (
    <article className="p-4 bg-white w-full max-w-2xl grid grid-cols-[max-content_1fr] gap-2 mb-4">
      <ProfilePhoto isMedium />
      <div className="grid g-4">
        <div className="flex justify-center items-center">
          <DisplayName name="Shubham Bajaj" username="shubhambajaj" isRowWise />
          <span>.</span>
          <span>Jun 27</span>
          <span className="ml-auto">...</span>
        </div>
        <p>
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
        <div className="flex justify-between">
          <button>Like</button>
          <button>Comment</button>
          <button>Share</button>
          <button>Bookmark</button>
        </div>
      </div>
    </article>
  );
}

export { Post };
