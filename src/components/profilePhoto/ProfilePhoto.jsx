function ProfilePhoto({
  source = "",
  isMedium = false,
  isLarge = false,
  extraClasses = "",
  children,
}) {
  return (
    <div
      className={`bg-center bg-cover bg-no-repeat ${
        isLarge ? "w-40 h-40" : isMedium ? "w-16 h-16" : "w-12 h-12"
      } bg-fill-background rounded-full ${extraClasses}`}
      style={{ backgroundImage: `url(${source})` }}
    >
      {children && children}
    </div>
  );
}

export { ProfilePhoto };
