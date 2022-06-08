function Button({
  name,
  text,
  onClickHandler,
  isPrimary = false,
  isSecondary = false,
  extraClasses = "",
  children,
}) {
  return (
    <button
      name={name}
      onClick={(e) => onClickHandler && onClickHandler(e)}
      className={`font-semibold py-2 px-4 h-10 border-solid border-muted-text border-2 text-muted-text  hover:bg-complementary hover:text-white ${
        isPrimary
          ? "bg-primary-cta border-primary-cta text-white"
          : isSecondary
          ? "border-primary-cta text-primary-cta"
          : ""
      } ${extraClasses}`}
    >
      {text}
      {children && children}
    </button>
  );
}

export { Button };
