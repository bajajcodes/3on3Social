import { db } from "firebaseLocal";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";

function getPeoples(
  username,
  following,
  setPeoples,
  isLimited = false,
  setIsEmpty
) {
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
    if (peoples.length === 0) {
      if (setIsEmpty) {
        setIsEmpty(true);
      }
    }
    setPeoples(peoples);
  });
}

export { getPeoples };
