import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { FormInput } from "../formInput/FormInput";
import { Button } from "../button/Button";
import { usePostComment } from "./PostComment.hook";
import { CloseIcon } from "icons";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

function PostComment({ postId, edit }) {
  const { profileImageUrl } = useSelector((state) => state.profile.userInfo);
  const { validateAndPostComment, validateAndUpdateComment } = usePostComment();
  const isFormHasChanges = useRef(false);
  const [contentValue, setContentValue] = useState("");

  function clearInputs() {
    setContentValue("");
  }

  async function submitForm(event) {
    if (edit?.show) {
      validateAndUpdateComment(
        event,
        isFormHasChanges,
        clearInputs,
        edit.commentId,
        edit.setEdit
      );
    } else {
      validateAndPostComment(event, isFormHasChanges, postId, clearInputs);
    }
  }

  useEffect(() => {
    if (edit?.show) {
      setContentValue(edit.content);
    }
  }, [edit]);

  return (
    <article className="bg-white w-full grid grid-cols-[max-content_1fr] gap-2">
      <ProfilePhoto source={profileImageUrl} />
      <form
        onSubmit={(e) => submitForm(e)}
        onChange={() => (isFormHasChanges.current = true)}
        className="grid grid-cols-[1fr_max-content_max-content] gap-1 place-items-center"
      >
        <FormInput
          info={{
            type: "text",
            minLength: "5",
            placeholder: "Comment Your Reply",
            name: "content",
            maxLength: "200",
            value: contentValue,
          }}
          updateInputValueToParent={(v) => {
            setContentValue(v);
          }}
          extraClasses="bg-primary-background"
        />
        <Button
          name={!edit?.show ? "post" : "update"}
          text={!edit?.show ? "Post" : "Update"}
          isPrimary
        />
        {edit?.show && (
          <button>
            <CloseIcon onClickFunc={edit.setEdit} />
          </button>
        )}
      </form>
    </article>
  );
}

export { PostComment };
