import { Link } from "react-router-dom";

function Hero() {
  return (
    <Link
      to="/"
      className="w-max grid grid-cols-[repeat(2,max-content)] gap-2 place-content-center place-items-center"
    >
      <img src="/logo/logo.svg" className="w-10 h-9" />
      <span className="text-2xl font-bold">
        <span className="text-primary-cta">3on3</span> Social
      </span>
    </Link>
  );
}

export { Hero };
