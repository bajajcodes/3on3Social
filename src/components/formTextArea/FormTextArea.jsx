import { useState, useEffect } from "react";

function FormTextArea({ info }) {
  const [inputValue, setInputValue] = useState("");

  function onChangeHandler(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  useEffect(() => {
    if (info.value) {
      setInputValue(info.value);
    }
  }, [info.value]);

  return (
    <label className="grid w-full">
      <span className="w-max">{info.labelText}</span>
      <textarea
        className="resize-none h-36 px-2 py-1 border-2 border-solid border-black col-start-1 col-end-3 font-medium placeholder:font-medium active:border-2 focus:border-2 active:outline-none focus:outline-none"
        name={info.name ?? "NA"}
        value={inputValue}
        minLength={info.minLength ?? ""}
        maxLength={info.maxLength ?? ""}
        placeholder={info.placeholder ?? ""}
        required
        onChange={(e) => onChangeHandler(e)}
      ></textarea>
    </label>
  );
}

export { FormTextArea };
