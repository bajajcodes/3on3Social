import {
  passwordInputType,
  togglePasswordInputType,
  authStatusAction,
} from "./auth.helpers";
import { useValidateForm } from "hooks";
import { loginUser } from "./authSlice";
import { AppHeading, FormInput, FormButton } from "components";
import { RightArrowIcon } from "icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [passwordType, setPasswordType] = useState(passwordInputType);
  const [primaryFormButtonText, SetPrimaryFormButtonText] = useState("Login");
  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

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

  function validateAndLoginUser(event) {
    try {
      const body = validateForm(event);
      dispatch(loginUser(body));
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  function fillGuestCredentials(event) {
    try {
      event.stopPropagation();
      setEmailInputValue("guestuser@anon.in");
      setPasswordInputValue("guestuser");
      dispatch(
        loginUser({ email: "guestuser@anon.in", password: "guestuser" })
      );
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  useEffect(() => {
    authStatusAction(
      auth.status,
      auth.message,
      "Login",
      SetPrimaryFormButtonText,
      SetFormErrorMessage
    );
  }, [auth.message, auth.status]);

  return (
    <main className="main grid gap-8 place-items-center py-4 px-16">
      <AppHeading />
      <section className="bg-white grid gap-8 p-4 place-items-center max-w-lg  py-7 px-12 drop-shadow-[4px_4px_12px_black]">
        <h2 className="text-4xl font-bold">Login</h2>
        <form
          onSubmit={(e) => validateAndLoginUser(e)}
          className="w-[18.5rem] grid gap-4 place-items-center font-medium"
        >
          <FormInput
            info={{
              labelText: "Email address",
              type: "email",
              minLength: "5",
              placeholder: "Enter Email address",
              name: "email",
              value: emailInputValue,
            }}
          />
          <FormInput
            info={{
              labelText: "Password",
              type: passwordType,
              minLength: "8",
              placeholder: "Enter Password",
              name: "password",
              value: passwordInputValue,
              icon: true,
              toggleInputType: togglePasswordType,
            }}
          />
          <span className="max-h-max text-red-500 font-bold">
            {formErrorMessage}
          </span>
          <FormButton text={primaryFormButtonText} />
          <FormButton
            text={"Guest Login"}
            isSecondary
            onClickHandler={fillGuestCredentials}
          />
          <div
            className="flex cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            <span>Create New Account</span>
            <RightArrowIcon />
          </div>
        </form>
      </section>
    </main>
  );
}

export { Login };
