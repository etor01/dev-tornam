"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions/auth";
import {
  LayoutDashboard,
  Code2,
  FileText,
  FlaskConical,
  Image,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: Code2 },
  { href: "/admin/notes", label: "Notes", icon: FileText },
  { href: "/admin/lab", label: "Lab", icon: FlaskConical },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="adminNav" aria-label="CMS navigation">
      <div className="adminNavBrand">
        <span className="adminNavBrandLabel">CMS</span>
        <span className="adminNavBrandTitle">etornam.me</span>
      </div>

      {navLinks.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`adminNavLink${isActive ? " active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </Link>
        );
      })}

      <div className="adminNavSpacer" />

      <div className="adminNavFooter">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="adminNavViewSite"
        >
          <ExternalLink size={12} aria-hidden="true" />
          View site
        </a>

        <form action={logout}>
          <button type="submit" className="adminLogoutBtn" id="admin-logout-btn">
            <LogOut size={12} aria-hidden="true" />
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}
