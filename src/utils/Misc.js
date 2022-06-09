import { db } from "firebaseLocal";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";

function checkIsNavigationAndSidebarRequired(pathname) {
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return false;
  }
  return true;
}

function imageInput(event) {
  const file = event.target.files[0];
  const source = URL.createObjectURL(file);
  return source;
}

function getDate(info) {
  try {
    if (info?.createdAt) {
      const createdAt = info.createdAt.toDate();
      const day = createdAt.getDate();
      const month = createdAt.getMonth();
      const year = createdAt.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  } catch (error) {
    //* This log is info describing old accounts created using Date object
    console.log(error.message);
    return info?.createdAt ?? "Date NA";
  }
}

function getPeoples(username, setPeoples, isLimited = false) {
  let usersQuery = null;
  if (isLimited) {
    usersQuery = query(
      collection(db, "users"),
      where("username", "!=", username),
      limit(4)
    );
  } else {
    usersQuery = query(
      collection(db, "users"),
      where("username", "!=", username)
    );
  }

  return onSnapshot(usersQuery, (snapshot) => {
    const peoples = [];
    snapshot.forEach((doc) =>
      peoples.push({
        uid: doc.id,
        name: doc.data().name,
        username: doc.data().username,
        profileImageUrl: doc.data().profileImageUrl,
      })
    );
    setPeoples(peoples);
  });
}

export { checkIsNavigationAndSidebarRequired, imageInput, getDate, getPeoples };
