function ModalBackground({ display, closeModal, isSmallBlurRequired = false }) {
  return (
    <div
      className={`${display} z-50 fixed top-0 left-0 w-full h-full ${
        isSmallBlurRequired ? "backdrop-blur-sm" : "backdrop-blur-lg"
      } bg-[rgba(255, 255, 255, 0.5)]`}
      onClick={closeModal}
    ></div>
  );
}

export { ModalBackground };
