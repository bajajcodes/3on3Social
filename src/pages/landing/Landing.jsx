import { data } from "./Landing.helpers";
import { AppHeading } from "components";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <main className="main bg-primary-background grid place-items-center max-w-max lg:grid-cols-2 m-auto">
      <div className="w-full h-0 pb-[96.67%] relative bg-cover bg-no-repeat">
        <img
          src="/assets/images/landing.png"
          alt="Discussion over how to be 3on3"
          className="w-full h-auto absolute top-0"
          loading="eager"
        />
      </div>
      <section className="p-4 mt-[-4rem] max-w-xl grid grid-rows-[max-content_5px_max-content_5px_repeat(2,max-content)] place-content-center place-items-center gap-2 lg:mt-0">
        <AppHeading />
        <div></div>
        <div className="uppercase leading-9 font-bold grid gap-2">
          {data.map(([title, text], index) => (
            <span className="text-3xl lg:text-4xl" key={index}>
              <span className="text-muted-text font-bold">{title}</span>{" "}
              <span className="text-base">{text}</span>
            </span>
          ))}
        </div>
        <div></div>
        <button
          className="w-full p-2 border-solid border-black border-2 bg-primary-cta font-semibold text-2xl leading-8 text-white text-center hover:bg-complementary"
          onClick={() => navigate("/signup")}
        >
          Join Now
        </button>
        <span
          className="text-primary-cta text-center font-bold text-base leading-6 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </span>
      </section>
    </main>
  );
}

export { Landing };
