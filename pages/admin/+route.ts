export default (pageContext: { urlPathname: string }) => {
  const p = pageContext.urlPathname;
  if (p === "/admin" || p.startsWith("/admin/")) return { routeParams: {} };
  return false;
};
