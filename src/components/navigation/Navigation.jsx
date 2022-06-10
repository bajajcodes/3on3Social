import { navLinks } from "./Navigation.helpers";
import { NewPostIcon, ProfileIcon } from "icons";
import { Button } from "components";
import { openModal } from "features";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const uid = useSelector((state) => state.auth.uid);
  const profileTo = uid === null ? "/login" : `/profile/${uid}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function createNewPostHandler(){
    if(uid === null){
      navigate("/login");
    }else{
      dispatch(openModal())
    }
  }

  return (
    <nav className="navigation w-full px-4 py-2  border-t-4 border-t-black border-solid fixed bottom-0 grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] justify-between place-items-center z-50 bg-primary-background lg:relative lg:grid-cols-1 lg:border-t-0 lg:h-max lg:gap-4 lg:auto-rows-[1fr] lg:w-max lg:place-items-start lg:justify-start lg:z-0">
      {navLinks.map(([title, url, Icon], index) => (
        <NavLink
          to={url}
          className={({ isActive }) => {
            return `p-2 hover:bg-[#c4c4c4] hover:rounded-full lg:flex lg:hover:rounded-none lg:w-full lg:gap-2 ${
              isActive
                ? "bg-[#c4c4c4] rounded-full lg:rounded-none font-bold"
                : ""
            }`;
          }}
          key={index}
        >
          <Icon />
          <span className="hidden lg:inline">{title}</span>
        </NavLink>
      ))}
      <NavLink
        to={profileTo}
        className={({ isActive }) => {
          return `p-2 hover:bg-[#c4c4c4] hover:rounded-full lg:flex lg:hover:rounded-none lg:w-full lg:gap-2 ${
            isActive
              ? "bg-[#c4c4c4] rounded-full lg:rounded-none font-bold"
              : ""
          }`;
        }}
      >
        <ProfileIcon />
        <span className="hidden lg:inline">Profile</span>
      </NavLink>
      <Button
        name="newPost"
        extraClasses={
          "flex place-content-center place-items-center text-black bg-inherit border-transparent w-10 h-10 p-[0_!important] bg-none font-bold hover:rounded-full lg:flex lg:bg-primary-cta lg:text-white lg:hover:rounded-none lg:w-full lg:px-6 lg:py-5 lg:place-items-center lg:px-[1.5rem_!important] lg:py-[1.25rem_!important]"
        }
        isPrimary
        onClickHandler={() => createNewPostHandler()}
      >
        <NewPostIcon />
        <span className="hidden lg:inline">Create New Post</span>
      </Button>
    </nav>
  );
}

export { Navigation };
