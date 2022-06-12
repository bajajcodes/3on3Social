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
      return JSON.stringify(createdAt);
    }
    return "";
  } catch (error) {
    //* This log is info describing old accounts created using Date object
    console.log(error.message);
    return info?.createdAt ?? "Date NA";
  }
}

function parseDateToDMY(createdAt) {
  try {
    if (createdAt) {
      const date = new Date(JSON.parse(createdAt));
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  } catch (error) {
    //* This log is info describing old accounts created using Date object
    console.log(error.message);
    return createdAt ?? "Date NA";
  }
}

function getPeoples(username, following, setPeoples, isLimited = false) {
  let usersQuery = null;
  if (username) {
    if (following.length > 0) {
      if (isLimited) {
        usersQuery = query(
          collection(db, "users"),
          where("username", "not-in", following),
          limit(5)
        );
      } else {
        usersQuery = query(
          collection(db, "users"),
          where("username", "not-in", following)
        );
      }
    } else {
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
    }
  } else {
    if (isLimited) {
      usersQuery = query(collection(db, "users"), limit(4));
    } else {
      usersQuery = query(collection(db, "users"));
    }
  }

  return onSnapshot(usersQuery, (snapshot) => {
    const peoples = [];
    snapshot.forEach((doc) => {
      if (username !== doc.data().username) {
        peoples.push({
          uid: doc.id,
          name: doc.data().name,
          username: doc.data().username,
          profileImageUrl: doc.data().profileImageUrl,
        });
      }
    });
    setPeoples(peoples);
  });
}

export {
  checkIsNavigationAndSidebarRequired,
  imageInput,
  getDate,
  parseDateToDMY,
  getPeoples,
};
