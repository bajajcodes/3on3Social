import { usePostModal } from "../../components/postModal/Post.hook";
import { ProfilePhoto, FormTextArea, Button } from "components";
import { ImageIcon, GifIcon, EmojiIcon } from "icons";
import { imageInput } from "utils";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Picker, { SKIN_TONE_LIGHT } from "emoji-picker-react";

function Post() {
  const profileImageUrl = useSelector(
    (state) => state.profile.userInfo.profileImageUrl
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mergeWithInputValue, setMergeWithInputValue] = useState("");
  const [imageUrlSource, setImageUrlSource] = useState("");
  const [contentValue, setContentValue] = useState("");
  const isFormHasChanges = useRef(false);
  const { validateAndCreateNewPost } = usePostModal();

  function onEmojiClick(event, emojiObject) {
    event.stopPropagation();
    isFormHasChanges.current = true;
    setMergeWithInputValue(emojiObject.emoji);
  }

  function updateImageSource(event) {
    const source = imageInput(event);
    setImageUrlSource(source);
  }

  function clearInputs() {
    setShowEmojiPicker(false);
    setMergeWithInputValue("");
    setImageUrlSource("");
    setContentValue("");
  }

  return (
    <section
      className={
        "p-4 bg-white w-full max-w-xl grid grid-cols-[max-content_1fr] gap-2"
      }
    >
      <ProfilePhoto isMedium source={profileImageUrl} />
      <form
        className="grid gap-2"
        onSubmit={(e) => {
          clearInputs();
          validateAndCreateNewPost(e, isFormHasChanges);
        }}
        onChange={() => (isFormHasChanges.current = true)}
      >
        <FormTextArea
          info={{
            labelText: "",
            name: "content",
            placeholder: "Write Something Interesting",
            minLength: "5",
            maxLength: "200",
            type: "text",
            extraClasses: "bg-primary-background",
            value: contentValue,
          }}
          mergeWithInputValue={mergeWithInputValue}
          updateParentInputValue={(value) => setContentValue(value)}
        />
        {imageUrlSource && (
          <img src={imageUrlSource} className="m-auto max-h-96" />
        )}
        <div className="flex place-items-center">
          <div className="grid grid-cols-3 gap-2">
            <label role="button" htmlFor="file">
              <ImageIcon />
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => updateImageSource(e)}
              />
            </label>
            <span role="button">
              <GifIcon />
            </span>
            <span
              role="button"
              onClick={() => setShowEmojiPicker((p) => !p)}
              className="relative"
            >
              <EmojiIcon />
              {showEmojiPicker && (
                <Picker
                  disableSearchBar
                  skinTone={SKIN_TONE_LIGHT}
                  onEmojiClick={onEmojiClick}
                  pickerStyle={{
                    width: "228px",
                    height: "228px",
                    position: "absolute",
                    left: "5%",
                    top: "0",
                  }}
                />
              )}
            </span>
          </div>
          <Button
            name="postContent"
            text="Post"
            extraClasses={"ml-auto"}
            isPrimary
          />
        </div>
      </form>
    </section>
  );
}

export { Post };
