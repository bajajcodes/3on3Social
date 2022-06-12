const filters = ["For You", "Trending", "Hot", "Newest", "Oldest"];

function filterPosts(filter, content) {
  const posts = [...content];
  if (filter === "For You") {
    return content;
  } else if (filter === "Trending") {
    return posts.sort((a, b) => b.likes.length - a.likes.length);
  } else if (filter === "Hot") {
    return posts.sort((a, b) => b.comments.length - a.comments.length);
  } else if (filter === "Newest") {
    return posts.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(JSON.parse(b.createdAt)) - new Date(JSON.parse(a.createdAt))
        );
      } else {
        return 0;
      }
    });
  } else if (filter === "Oldest") {
    return posts.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return (
          new Date(JSON.parse(a.createdAt)) - new Date(JSON.parse(b.createdAt))
        );
      } else {
        return 0;
      }
    });
  }
}

export { filters, filterPosts };
