"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Code2, PenLine, FlaskConical, FileText } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "HOME",
    href: "/",
    icon: Terminal,
    exact: true,
  },
  {
    label: "PROJECTS",
    href: "/projects",
    icon: Code2,
  },
  {
    label: "THOUGHTS",
    href: "/thoughts",
    icon: PenLine,
  },
  {
    label: "LAB",
    href: "/lab",
    icon: FlaskConical,
  },
  {
    label: "RESUME",
    href: "/documents",
    icon: FileText,
  },
];

export default function MobileNavBar() {
  const pathname = usePathname();

  // Do not show the mobile bottom bar on admin dashboard or login pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="mobileBottomNav" aria-label="Mobile Navigation">
      <div className="mobileBottomNavInner">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobileNavItem ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="mobileNavIconWrapper">
                <Icon size={18} className="mobileNavIcon" />
                {isActive && <span className="mobileNavActiveDot" aria-hidden="true" />}
              </div>
              <span className="mobileNavLabel">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
