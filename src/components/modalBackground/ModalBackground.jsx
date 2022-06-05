function ModalBackground({ display, closeModal }) {
  return (
    <div
      className={`${display} fixed top-0 left-0 w-full h-full backdrop-blur-lg bg-[rgba(255, 255, 255, 0.5)]`}
      onClick={closeModal}
    ></div>
  );
}

export { ModalBackground };
