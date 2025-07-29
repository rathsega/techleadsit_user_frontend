import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumb = () => {
  const router = useRouter();
  const pathArr = router.asPath.split("?")[0].split("/").filter(Boolean);

  // Home always first
  const crumbs = [
    { href: "/", label: "Home" },
    ...pathArr.map((seg, idx) => ({
      href: "/" + pathArr.slice(0, idx + 1).join("/"),
      label: decodeURIComponent(seg.replace(/-/g, " ")).replace(/\b\w/g, l => l.toUpperCase()),
    })),
  ];

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        {crumbs.map((crumb, idx) => (
          <li
            key={crumb.href}
            className={`breadcrumb-item${idx === crumbs.length - 1 ? " active" : ""}`}
            aria-current={idx === crumbs.length - 1 ? "page" : undefined}
          >
            {idx === crumbs.length - 1 ? (
              crumb.label
            ) : (
              <Link href={crumb.href}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;