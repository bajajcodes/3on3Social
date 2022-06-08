function DisplayName({
  name,
  username,
  isRowWise = false,
  isBaseSize = false,
  extraClasses = "",
}) {
  return (
    <div
      className={`flex ${isRowWise ? "flex-row" : "flex-col"} ${extraClasses}`}
    >
      <h4
        className={`font-bold ${
          isBaseSize ? "text-base" : "text-2xl"
        } text-black text-center `}
      >
        {name}
      </h4>
      <h4
        className={`${
          isBaseSize ? "text-base" : "text-2xl"
        } text-muted-text text-center`}
      >
        <span>@</span>
        {username}
      </h4>
    </div>
  );
}
export { DisplayName };
