import { Loader, Post } from "components";
import {useBookmarks} from "./Bookmarks.hook";

function Bookmarks() {
  const {content,status} = useBookmarks();

  return (
    <main className="main max-w-xl grid gap-2 p-4 m-auto lg:mx-auto lg:my-0 z-0">
      {status === "loading" && (
        <div className="relative flex place-items-center mt-8 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader message="Posts Loading..." />
        </div>
      )}
      {status === "success" && (
        <section>
          <h1 className="text-2xl font-bold">Your Bookmarks</h1>
          {content.length === 0 && (
            <h1 className="text-xl font-bold">
              You do not have bookmarked posts
            </h1>
          )}
          {content.length !== 0 &&
            content.map((post) => (
              <Post
                key={post.id}
                postInfo={{
                  profileImageUrl: post.profileImageUrl,
                  imageUrl: post.imageUrl,
                  name: post.name,
                  username: post.username,
                  createdAt: post.createdAt,
                  content: post.content,
                  comments: post.comments,
                  likes: post.likes,
                  bookmarks: post.bookmarks,
                  id: post.id,
                  uid: post.uid,
                }}
              />
            ))}
        </section>
      )}
    </main>
  );
}

export { Bookmarks };
