import { Hero } from "../hero/Hero";

function Footer() {
  return (
    <footer className="footer relative p-2 pb-16 grid gap-4 bg-white border-t-4 border-solid border-t-black lg:grid-cols-2 lg:pb-2">
      <section className="">
        <Hero />
        <p>
          Get what you need to live a life less ordinary, become 3 on 3 and live
          a healthy life, make money and game the system. 3on3 Social is subject
          to truth risk and persuasive skill.
        </p>
      </section>
      <section className="lg:justify-self-end">
        <h2 className="text-2xl font-bold">Written ✍🏻 by</h2>
        <h3 className="text-2xl font-bold">Shubham Bajaj</h3>
      </section>
    </footer>
  );
}

export { Footer };
