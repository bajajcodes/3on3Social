import { LocalStorage, Toast } from "utils";
const passwordInputType = "password";

function togglePasswordInputType(state, setState) {
  if (state === "password") {
    setState("text");
  } else {
    setState("password");
  }
}

function getAuthInitialState() {
  const auth = LocalStorage.get("auth");
  if (auth === "NA") {
    return {
      uid: null,
      isLoggedIn: false,
    };
  }

  return {
    uid: auth.uid,
    isLoggedIn: auth.isLoggedIn,
  };
}

function authStatusAction(
  status,
  message,
  type,
  setFormButtonText,
  setFormErrorMessage
) {
  if (status === "loading") {
    setFormButtonText("Loading...");
  }
  if (status === "failed") {
    setFormButtonText(type);
    setFormErrorMessage(message);
  }
  if (status === "success") {
    setFormButtonText(type);
    Toast.success(message);
  }
}

export {
  passwordInputType,
  togglePasswordInputType,
  getAuthInitialState,
  authStatusAction,
};
