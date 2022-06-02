function FormButton({ text, isSecondary = false, onClickHandler }) {
  return (
    <button
      className={`font-semibold w-full py-2 px-4 border-solid border-black border-2 hover:bg-complementary ${
        !isSecondary
          ? "bg-primary-cta text-white"
          : "text-primary-cta hover:text-white"
      }`}
      onClick={(e) => onClickHandler && onClickHandler(e)}
    >
      {text}
    </button>
  );
}

export { FormButton };
