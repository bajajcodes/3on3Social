import { getTextAccordingToCursorPosition } from "./FormTextArea.helpers";
import { useState, useEffect } from "react";

function FormTextArea({
  info,
  extraClasses = "",
  mergeWithInputValue = "",
  updateParentInputValue,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);

  function onChangeHandler(event) {
    let value = event.target.value;
    setInputValue(value);
    if (updateParentInputValue) {
      updateParentInputValue(value);
    }
  }

  useEffect(() => {
    setInputValue(info.value);
  }, [info.value]);

  useEffect(() => {
    const value = getTextAccordingToCursorPosition(
      inputValue,
      selectionStart,
      mergeWithInputValue
    );
    if (value && mergeWithInputValue) {
      setInputValue(value);
    }
  }, [mergeWithInputValue]);

  return (
    <label className="grid w-full">
      <span className="w-max">{info.labelText}</span>
      <textarea
        className={`resize-none h-36 px-2 py-1 border-2 border-solid border-black col-start-1 col-end-3 font-medium placeholder:font-medium active:border-2 focus:border-2 active:outline-none focus:outline-none ${extraClasses}`}
        name={info.name ?? "NA"}
        value={inputValue}
        minLength={info.minLength ?? ""}
        maxLength={info.maxLength ?? ""}
        placeholder={info.placeholder ?? ""}
        required
        onChange={(e) => onChangeHandler(e)}
        onKeyUp={(e) => {
          setSelectionStart(e.target.selectionStart);
        }}
        onMouseUp={(e) => {
          setSelectionStart(e.target.selectionStart);
        }}
      ></textarea>
    </label>
  );
}

export { FormTextArea };
