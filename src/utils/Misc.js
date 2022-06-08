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

export { checkIsNavigationAndSidebarRequired, imageInput };
