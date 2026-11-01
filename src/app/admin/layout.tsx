import "./admin.css";

export const metadata = {
  title: "CMS Admin — etornam.me",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
