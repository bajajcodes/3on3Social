import { ModalBackground } from "../modalBackground/ModalBackground";
import { EditProfile } from "../editProfile/EditProfile";
import { useState, useEffect } from "react";

function EditProfileModal({ show, resetDisplay, info }) {
  const [display, setDisplay] = useState("hidden");

  function closeModal() {
    setDisplay("hidden");
    resetDisplay();
  }

  function openModal() {
    setDisplay("block");
  }

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <>
      <ModalBackground display={display} closeModal={closeModal} />
      <EditProfile display={display} closeModal={closeModal} info={info} />
    </>
  );
}

export { EditProfileModal };
