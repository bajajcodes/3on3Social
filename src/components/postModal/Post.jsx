import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { FormTextArea } from "../formTextArea/FormTextArea";
import { Button } from "../button/Button";
import { ImageIcon, GifIcon, EmojiIcon } from "icons";
import { usePostModal } from "./Post.hook";
import { imageInput } from "utils";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Picker, { SKIN_TONE_LIGHT } from "emoji-picker-react";

function Post({ editPostModalOpened }) {
  const profileImageUrl = useSelector(
    (state) => state.profile.userInfo.profileImageUrl
  );
  const { display, info } = useSelector((state) => state.postModal);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mergeWithInputValue, setMergeWithInputValue] = useState("");
  const [imageUrlSource, setImageUrlSource] = useState(info.imageUrl);
  const isFormHasChanges = useRef(false);
  const { validateAndCreateNewPost } = usePostModal(editPostModalOpened);

  function onEmojiClick(event, emojiObject) {
    event.stopPropagation();
    isFormHasChanges.current = true;
    setMergeWithInputValue(emojiObject.emoji);
  }

  function updateImageSource(event) {
    const source = imageInput(event);
    setImageUrlSource(source);
  }

  return (
    <section
      className={`p-4 bg-white w-full max-w-xl grid grid-cols-[max-content_1fr] gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 drop-shadow-[4px_4px_12px_black] ${display}`}
    >
      <ProfilePhoto isMedium source={profileImageUrl} />
      <form
        className="grid gap-2"
        onSubmit={(e) => validateAndCreateNewPost(e, isFormHasChanges)}
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
            value: info?.content ?? "",
          }}
          mergeWithInputValue={mergeWithInputValue}
        />
        {imageUrlSource && <img src={imageUrlSource} className="m-auto " />}
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
            <span role="button" onClick={() => setShowEmojiPicker((p) => !p)}>
              <EmojiIcon />
              {showEmojiPicker && (
                <Picker
                  disableSearchBar
                  skinTone={SKIN_TONE_LIGHT}
                  onEmojiClick={onEmojiClick}
                  pickerStyle={{
                    width: "228px",
                    height: "228px",
                    position: "fixed",
                    left: "5%",
                    top: "40%",
                  }}
                />
              )}
            </span>
          </div>
          <Button
            name="postContent"
            text={info?.content ? "Update" : "Post"}
            extraClasses={"ml-auto"}
            isPrimary
          />
        </div>
      </form>
    </section>
  );
}

export { Post };
