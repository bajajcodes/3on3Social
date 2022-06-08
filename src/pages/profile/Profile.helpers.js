function getDate(postInfo) {
  if (postInfo?.createdAt) {
    const createdAt = postInfo.createdAt.toDate();
    const day = createdAt.getDate();
    const month = createdAt.getMonth();
    const year = createdAt.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
}

export { getDate };
