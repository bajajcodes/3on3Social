import { toast } from "react-toastify";

function getToast(type, message) {
  toast[type](message, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  });
}

function success(message) {
  getToast("success", message);
}

function info(message) {
  getToast("info", message);
}

function warning(message) {
  getToast("warning", message);
}
function error(message) {
  getToast("error", message);
}

const Toast = {
  success,
  info,
  warning,
  error,
};

export { Toast };
