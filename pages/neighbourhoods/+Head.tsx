import { usePageContext } from "vike-react/usePageContext";

// Canonical for /neighbourhoods AND /neighbourhoods/:slug. Reading urlPathname
// keeps the link in sync with whatever page Vike matched, so we only render
// one canonical per page instead of stacking (which would happen with a
// second +Head.tsx in the @slug subdirectory).
export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || "/neighbourhoods").replace(
    /\/$/,
    "",
  );
  return (
    <link
      rel="canonical"
      href={`https://luxuryhomescalgary.ca${pathname || "/neighbourhoods"}`}
    />
  );
}
