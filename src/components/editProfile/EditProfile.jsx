import { CloseIcon, CameraIcon } from "icons";
import { Button, FormInput, ProfilePhoto, FormTextArea } from "components";
import {imageInput} from "utils";
import { useEditProfile } from "./EditProfile.hook";
import { useState, useRef } from "react";

function EditProfile({ closeModal, display, info, editProfileFormOpened }) {
  const [profilePhotoSource, setProfilePhotoSource] = useState(
    info?.profileImageUrl ?? ""
  );
  const isFormHasChanges = useRef(false);
  const { validateAndUpdateProfileInfo } = useEditProfile(closeModal, editProfileFormOpened);

  function updateProfilePhotoSource(event){
    const source = imageInput(event);
    setProfilePhotoSource(source);
  }

  return (
    <section
      className={`w-full max-w-lg p-4 bg-white z-50 fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 drop-shadow-[4px_4px_12px_black] ${display}`}
    >
      <form
        onSubmit={(e) => validateAndUpdateProfileInfo(e, isFormHasChanges)}
        className="grid gap-2"
        onChange={() => (isFormHasChanges.current = true)}
      >
        <div className="flex flex-wrap g-1">
          <CloseIcon onClickFunc={closeModal} />
          <span className="ml-2 font-bold">Edit Profile</span>
          <Button
            name="saveProfile"
            text="Save"
            extraClasses={"ml-auto"}
            isPrimary
          />
        </div>
        <ProfilePhoto
          extraClasses="m-auto relative"
          source={profilePhotoSource}
          isLarge
        >
          <label
            htmlFor="profile-photo"
            className="w-12 h-12 flex place-items-center place-content-center cursor-pointer absolute right-0 bottom-0 bg-white border-solid rounded-full border-2 "
          >
            <CameraIcon />
            <input
              id="profile-photo"
              name="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => updateProfilePhotoSource(e)}
            />
          </label>
        </ProfilePhoto>
        <FormInput
          info={{
            labelText: "Name",
            name: "name",
            type: "text",
            minLength: "5",
            placeholder: "Enter Name",
            value: info?.name ?? "",
          }}
        />
        <FormTextArea
          info={{
            labelText: "Bio",
            name: "bio",
            type: "text",
            minLength: "5",
            maxLength: "180",
            placeholder: "Enter Bio",
            value: info?.bio ?? "",
          }}
        />
        <FormInput
          info={{
            labelText: "Website",
            name: "website",
            type: "url",
            minLength: "5",
            placeholder: "Enter Website",
            value: info?.website ?? "",
          }}
        />
      </form>
    </section>
  );
}

export { EditProfile };
