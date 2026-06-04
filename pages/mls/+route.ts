// Match /mls AND every URL beginning with /mls/ (Vike's "/mls/*" glob only
// matches the second form, so /mls alone was falling through to the
// "no page matched" error page).
export default (pageContext: { urlPathname: string }) => {
  const p = pageContext.urlPathname;
  if (p === "/mls" || p.startsWith("/mls/")) return { routeParams: {} };
  return false;
};
