import { useExplore } from "./Explore.hook";
import { filters, filterPosts } from "utils";
import { Loader, Post } from "components";
import { useState } from "react";

function Explore() {
  const { content, status } = useExplore();
  const [activeFilter, setActiveFilter] = useState("For You");

  return (
    <main className="main max-w-xl grid gap-2 p-4 m-auto lg:mx-auto lg:my-0 z-0">
      {status === "loading" && (
        <div className="z-50 w-100 h-100 bg-fill-background fixed top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader message="Posts Loading..." />
        </div>
      )}
      {status === "success" && <h1 className="text-2xl font-bold">Explore</h1>}
      {status === "success" && (
        <section className="p-1 grid w-full grid-cols-[repeat(auto-fit,minmax(max-content,110px))] gap-2 mb-2">
          {filters.map((filter, index) => (
            <span
              className={`p-2 text-center font-semibold border-solid border-2 border-muted-text hover:bg-fill-background ${
                activeFilter === filter ? "bg-fill-background" : ""
              }`}
              role="button"
              key={index}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </span>
          ))}
        </section>
      )}
      {status === "success" && (
        <section className="w-full">
          {content &&
            filterPosts(activeFilter, content).map((post) => (
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
                  id: post.id,
                  uid: post.uid,
                }}
              />
            ))}
          {content && content.length === 0 && (
            <h3 className="text-4xl font-medium">
              No Posts Written By Community.
            </h3>
          )}
        </section>
      )}
    </main>
  );
}

export { Explore };
