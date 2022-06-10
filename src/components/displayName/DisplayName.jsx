function DisplayName({
  name,
  username,
  isRowWise = false,
  isBaseSize = false,
  extraClasses = "",
  onClickHandler,
}) {
  return (
    <div
      className={`flex ${isRowWise ? "flex-row" : "flex-col"} ${extraClasses} ${
        isBaseSize ? "text-base" : "text-2xl"
      } ${onClickHandler ? "cursor-pointer" : ""}`}
      onClick={(e) => onClickHandler && onClickHandler(e)}
    >
      <h4 className={"font-bold  text-black "}>{name}</h4>
      <h4 className={" text-muted-text"}>
        <span>@</span>
        {username}
      </h4>
    </div>
  );
}
export { DisplayName };
