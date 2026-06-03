import { usePageContext } from "vike-react/usePageContext";

export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || "/blog").replace(/\/$/, "");
  return (
    <link
      rel="canonical"
      href={`https://luxuryhomescalgary.ca${pathname || "/blog"}`}
    />
  );
}
