import { PasswordVisibleIcon, PasswordInvisibleIcon } from "icons";
import { useState, useEffect } from "react";

function FormInput({ info }) {
  const [inputValue, setInputValue] = useState(info?.value ?? "");

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
      {info.icon && info.type === "password" && (
        <PasswordVisibleIcon toggleInputType={info.toggleInputType} />
      )}
      {info.icon && info.type === "text" && (
        <PasswordInvisibleIcon toggleInputType={info.toggleInputType} />
      )}
      <input
        className={`px-2 py-1 border-2 border-solid border-black col-start-1 col-end-3 ${
          info.type !== "password" ? "font-medium" : "font-black"
        } placeholder:font-medium active:border-2 focus:border-2 active:outline-none focus:outline-none`}
        name={info.name ?? "NA"}
        type={info.type ?? "text"}
        value={inputValue}
        minLength={info.minLength ?? ""}
        maxLength={info.maxLength ?? ""}
        placeholder={info.placeholder ?? ""}
        required
        onChange={(e) => onChangeHandler(e)}
      />
    </label>
  );
}

export { FormInput };
