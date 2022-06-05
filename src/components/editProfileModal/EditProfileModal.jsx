import { ModalBackground } from "../modalBackground/ModalBackground";
import { EditProfile } from "../editProfile/EditProfile";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Loader } from "components";

function EditProfileModal({ show, resetDisplay, info }) {
  const [display, setDisplay] = useState("hidden");
  const { status } = useSelector((state) => state.profile);
  const isEditProfileFormOpened = useRef(false);

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

  function editProfileFormOpened() {
    isEditProfileFormOpened.current = true;
  }

  return (
    <>
      <ModalBackground display={display} closeModal={closeModal} />
      {isEditProfileFormOpened.current === false && (
        <EditProfile
          display={display}
          closeModal={closeModal}
          info={info}
          editProfileFormOpened={editProfileFormOpened}
        />
      )}
      {status === "updating" && <Loader message={"Updating..."} />}
    </>
  );
}

export { EditProfileModal };
