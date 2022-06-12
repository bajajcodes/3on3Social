import { SearchForm } from "../searchForm/SearchForm";
import { PeopleCards } from "../peopleCards/PeopleCards";
import { Loader } from "../loader/Loader";
import { getPeoples } from "utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.profile.userInfo);
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    let unsubscribe = getPeoples(
      userInfo?.username,
      userInfo?.following,
      setPeoples,
      true
    );
    return () => unsubscribe();
  }, [userInfo]);

  return (
    <aside className=" p-1 lg:pr-4 m-auto lg:m-0">
      {false && <SearchForm />}
      <section className="p-1 lg:p-2 grid bg-white  lg:m-auto">
        <div className="p-1 lg:p-4 flex gap-2 place-items-center border-solid border-b-4 ">
          <span className="font-semibold">Who to Follow?</span>
          <span
            role="button"
            className="ml-auto text-primary-cta hover:text-complementary font-semibold"
            onClick={() => navigate("/people")}
          >
            Show More
          </span>
        </div>
        {peoples.length === 0 && (
          <div className="m-4 relative">
            <Loader />
          </div>
        )}
        <PeopleCards peoples={peoples} />
      </section>
    </aside>
  );
}

export { Sidebar };
