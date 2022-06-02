import { navLinks } from "./Navigation.helpers";
import { NewPostIcon } from "icons";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation w-full px-4 py-2 border-t-4 border-t-black border-solid fixed bottom-0 grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] justify-between place-items-center z-50 bg-primary-background lg:relative lg:grid-cols-1 lg:border-t-0 lg:h-max lg:gap-4 lg:auto-rows-[1fr] lg:w-max lg:place-items-start lg:justify-start lg:z-0">
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
      <button className="h-10 p-2 hover:rounded-full hover:bg-[#17bbdbb3] hover:text-white font-bold lg:flex lg:bg-primary-cta lg:text-white lg:hover:rounded-none lg:w-full lg:px-6 lg:py-5 lg:place-items-center">
        <NewPostIcon />
        <span className="hidden lg:inline">Create New Post</span>
      </button>
    </nav>
  );
}

export { Navigation };
