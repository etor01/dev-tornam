export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-2 text-center mt-8 bg-linear-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-md">

      <p className="text-sm text-gray-100">
        Etornam Kordzo Ahiataku &copy; {currentYear} | All rights reserved.
      </p>
      
    </footer>
  );
}