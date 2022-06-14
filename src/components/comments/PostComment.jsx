import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { FormInput } from "../formInput/FormInput";
import { Button } from "../button/Button";
import { usePostComment } from "./PostComment.hook";
import { CloseIcon } from "icons";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostComment({ postId, edit }) {
  const uid = useSelector((state) => state.auth.uid);
  const { profileImageUrl } = useSelector((state) => state.profile.userInfo);
  const { validateAndPostComment, validateAndUpdateComment } = usePostComment();
  const isFormHasChanges = useRef(false);
  const [contentValue, setContentValue] = useState("");
  const navigate = useNavigate();


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

  function onClickHandler() {
    navigate(`/profile/${uid}`);
  }

  useEffect(() => {
    if (edit?.show) {
      setContentValue(edit.content);
    }
  }, [edit]);

  return (
    <article className="bg-white w-full grid grid-cols-[max-content_1fr] gap-2">
      <ProfilePhoto source={profileImageUrl} onClickHandler={() => onClickHandler()}/>
      <form
        onSubmit={(e) => submitForm(e)}
        onChange={() => (isFormHasChanges.current = true)}
        className="grid gap-1 place-items-center"
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
          extraClasses="bg-primary-background w-11/12"
        />
        <div className="flex place-items-center">
          <Button
            name={!edit?.show ? "post" : "update"}
            text={!edit?.show ? "Post" : "Update"}
            isPrimary
          />
          {edit?.show && (
            <button className="ml-1">
              <CloseIcon onClickFunc={edit.setEdit} />
            </button>
          )}
        </div>
      </form>
    </article>
  );
}

export { PostComment };
