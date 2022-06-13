import { Toast } from "./Toast";

function checkIsNavigationAndSidebarRequired(pathname) {
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return false;
  }
  return true;
}

function imageInput(event) {
  const file = event.target.files[0];
  const source = URL.createObjectURL(file);
  return source;
}

function showToastOnFailedAndSuccessStatus(status, message) {
  if (status !== "loading" && message) {
    if (status === "failed") Toast.error(message);
    else if (status === "success") Toast.success(message);
  }
}

export {
  checkIsNavigationAndSidebarRequired,
  imageInput,
  showToastOnFailedAndSuccessStatus,
};
