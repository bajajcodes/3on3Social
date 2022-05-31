function checkIsNavigationAndSidebarRequired(pathname) {
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return false;
  }
  return true;
}

export { checkIsNavigationAndSidebarRequired };
