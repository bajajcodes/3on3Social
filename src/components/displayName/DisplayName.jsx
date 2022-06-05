function DisplayName({ name, username, isRowWise = false }) {
  return (
    <div className={`flex ${isRowWise ? "flex-row" : "flex-col"}`}>
      <h4 className="font-bold text-2xl text-black text-center ">{name}</h4>
      <h4 className="text-2xl text-muted-text text-center">
        <span>@</span>
        {username}
      </h4>
    </div>
  );
}
export { DisplayName };
