// Vike v1 error page (https://vike.dev/error-page). Renders for every URL
// that doesn't match a defined route AND for any 500 thrown during render.
// SSR-only (not prerendered) because we need pageContext.is404 to switch
// between the 404 and 500 copy at request time.
export default { prerender: false };
