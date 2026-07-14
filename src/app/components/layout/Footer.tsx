export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-(--border) bg-(--card-bg)">
      footer {currentYear}
    </footer>
  );
}
