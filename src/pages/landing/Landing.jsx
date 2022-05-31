import { data } from "./Landing.helpers";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <main className="main bg-primary-background grid place-items-center max-w-max lg:grid-cols-2">
      <figure className="w-full">
        <img
          src="/assets/images/landing.png"
          alt="Discussion over how to be 3on3"
          className="max-w-[80%] my-0 mx-auto"
          loading="eager"
        />
      </figure>
      <section className="p-4 mt-[-4rem] max-w-xl grid grid-rows-[max-content_5px_max-content_5px_repeat(2,max-content)] place-content-center place-items-center gap-2 lg:mt-0">
        <h1 className="text-6xl text-center font-bold lg:text-normal lg:text-7xl">
          <span className="text-primary-cta">3on3</span> Social
        </h1>
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
          className="w-full p-2 border-solid border-black border-2 bg-primary-cta font-semibold text-2xl leading-8 text-white text-center"
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
