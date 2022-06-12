import { useHome } from "./Home.hook";
import { Post as CreatePost } from "./Post";
import { Loader, Post } from "components";

function Home() {
  const { content, status } = useHome();

  return (
    <main className="main max-w-xl grid gap-2 p-4 m-auto lg:mx-auto lg:my-0 z-0">
      {status === "success" && (
        <>
          <section className="w-full">
            <CreatePost />
          </section>
          <h1 className="text-2xl font-bold">Home</h1>
        </>
      )}
      <section className="w-full">
        {status === "success" && (
          <>
            {content &&
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
          </>
        )}
        {status === "loading" && (
          <div className="relative flex place-items-center mt-8">
            <Loader message="Posts Loading..." />
          </div>
        )}
      </section>
    </main>
  );
}

export { Home };
