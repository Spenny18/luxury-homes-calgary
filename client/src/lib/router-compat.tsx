// Shim that lets pages keep their existing Wouter-style imports while
// actually being routed by Vike. `<Link href><a>...</a></Link>` becomes a
// real <a href> in the SSR HTML (good for Google), and useLocation /
// useRoute read from Vike's pageContext.
//
// To migrate a page off Wouter, change the import:
//     import { Link, useLocation, useRoute } from "wouter";
// to:
//     import { Link, useLocation, useRoute } from "@/lib/router-compat";
import {
  Children,
  cloneElement,
  isValidElement,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { usePageContext } from "vike-react/usePageContext";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [k: string]: any;
}

// Wouter's <Link> wraps an <a> and forwards the href onto it. We do the same
// thing with a plain anchor — full-document navigation between Vike pages,
// which is exactly what Google needs to see in the SSR HTML.
export function Link({ href, children, className, onClick, ...rest }: LinkProps) {
  // Wouter pattern: <Link href="/x"><a className="...">label</a></Link>.
  // We hoist the inner <a>'s props onto an actual <a href> so the rendered
  // HTML carries the href attribute exactly where Google looks for it.
  if (
    Children.count(children) === 1 &&
    isValidElement(children) &&
    (children as ReactElement).type === "a"
  ) {
    const child = children as ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
    return cloneElement(child, {
      href,
      ...rest,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        child.props.onClick?.(e as any);
        onClick?.(e);
      },
    });
  }
  // Bare pattern: <Link href="/x">label</Link>
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

// Returns [currentPath, navigate]. navigate triggers a full reload (Vike picks
// the next page server-side) which is what we want — the destination is
// already SSG/SSR-rendered, so a hard nav is fast and matches the URL bar.
export function useLocation(): [string, (path: string) => void] {
  const pageContext = usePageContext();
  const current = pageContext.urlPathname || "/";
  const navigate = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };
  return [current, navigate];
}

// Wouter's useRoute returns [matched, params]. In Vike, the file system has
// already picked the matching page, so `matched` is true whenever this hook
// runs inside its page. We return Vike's routeParams (e.g. { slug }).
export function useRoute<P extends Record<string, string> = Record<string, string>>(
  _pattern: string,
): [boolean, P | null] {
  const pageContext = usePageContext();
  const params = (pageContext.routeParams ?? {}) as P;
  return [true, params];
}
