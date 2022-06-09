function DisplayName({
  name,
  username,
  isRowWise = false,
  isBaseSize = false,
  extraClasses = "",
}) {
  return (
    <div
      className={`flex ${isRowWise ? "flex-row" : "flex-col"} ${extraClasses} ${
        isBaseSize ? "text-base" : "text-2xl"
      } `}
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
