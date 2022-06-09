import { PeopleCards, Loader } from "components";
import { getPeoples } from "utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function People() {
  const userInfo = useSelector((state) => state.profile.userInfo);
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    if (userInfo?.username) {
      unsubscribe = getPeoples(userInfo.username, setPeoples);
      return () => unsubscribe && unsubscribe();
    }
  }, [userInfo]);

  return (
    <main className="main p-4">
      <h1 className="text-4xl font-medium text-center mb-2">
        People To Follow
      </h1>
      <section className="grid gap-4 max-w-xl m-auto">
        {peoples.length === 0 && (
          <div className="m-4 relative">
            <Loader />
          </div>
        )}
        <PeopleCards peoples={peoples} isRowWise={true} />
      </section>
    </main>
  );
}

export { People };
