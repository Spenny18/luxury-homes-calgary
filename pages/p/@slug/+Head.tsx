import { usePageContext } from "vike-react/usePageContext";

export default function Head() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug;
  if (!slug) return null;
  return (
    <link rel="canonical" href={`https://luxuryhomescalgary.ca/p/${slug}`} />
  );
}
