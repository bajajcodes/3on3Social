import {
  passwordInputType,
  togglePasswordInputType,
  authStatusAction,
} from "./auth.helpers";
import { useValidateForm } from "hooks";
import { signupUser } from "./authSlice";
import { AppHeading, FormInput, FormButton } from "components";
import { RightArrowIcon } from "icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [passwordType, setPasswordType] = useState(passwordInputType);
  const [confirmPasswordType, setConfirmPasswordType] =
    useState(passwordInputType);
  const [primaryFormButtonText, SetPrimaryFormButtonText] = useState("Signup");
  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { validateForm } = useValidateForm({
    formErrorMessage,
    SetFormErrorMessage,
  });

  const navigate = useNavigate();

  function togglePasswordType() {
    togglePasswordInputType(passwordType, setPasswordType);
  }

  function toggleConfirmPasswordType() {
    togglePasswordInputType(confirmPasswordType, setConfirmPasswordType);
  }

  function validateAndSignupUser(event) {
    try {
      const body = validateForm(event);
      if (body.password === body.confirm_password) {
        dispatch(signupUser(body));
      } else {
        throw new Error("Passwords do not match");
      }
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  useEffect(() => {
    authStatusAction(
      auth.status,
      auth.message,
      "Signup",
      SetPrimaryFormButtonText,
      SetFormErrorMessage
    );
  }, [auth.status]);

  return (
    <main className="main grid gap-8 place-items-center py-4 px-16">
      <AppHeading />
      <section className="bg-white grid gap-8 p-4 place-items-center max-w-lg  py-7 px-12 drop-shadow-[4px_4px_12px_black]">
        <h2 className="text-4xl font-bold">Signup</h2>
        <form
          onSubmit={(e) => validateAndSignupUser(e)}
          className="w-[18.5rem] grid gap-4 place-items-center font-medium"
        >
          <FormInput
            info={{
              labelText: "Name",
              type: "text",
              minLength: "5",
              placeholder: "Enter Name",
              name: "name",
            }}
          />
          <FormInput
            info={{
              labelText: "Username",
              type: "text",
              minLength: "5",
              placeholder: "Enter Username",
              name: "username",
            }}
          />
          <FormInput
            info={{
              labelText: "Email address",
              type: "email",
              minLength: "5",
              placeholder: "Enter Email address",
              name: "email",
            }}
          />
          <FormInput
            info={{
              labelText: "Password",
              type: passwordType,
              minLength: "8",
              placeholder: "Enter Password",
              name: "password",
              icon: true,
              toggleInputType: togglePasswordType,
            }}
          />
          <FormInput
            info={{
              labelText: "Confirm Password",
              type: confirmPasswordType,
              minLength: "8",
              placeholder: "Enter Confirm Password",
              name: "confirm_password",
              icon: true,
              toggleInputType: toggleConfirmPasswordType,
            }}
          />
          <span className="max-h-max text-red-500 font-bold">
            {formErrorMessage}
          </span>
          <FormButton text={primaryFormButtonText} />
          <div
            className="flex cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            <span>Already have an account</span>
            <RightArrowIcon />
          </div>
        </form>
      </section>
    </main>
  );
}

export { Signup };
