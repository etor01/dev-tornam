import Link from "next/link";

export default function ConstructionPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className=" mx-auto text-lg md:text-5xl font-bold mb-6 ">
        <span className="animate-pulse">🚧</span> Under Maintenance  <span className="animate-pulse">🚧</span>
      </h1>
      <p className="text-xl text-center max-w-2xl">
        Please come back later. This page is currently under maintenance and will be available soon.
      </p>
      <Link href="/" className="px-6 py-3 bg-yellow-500/20 text-slate-200 rounded-lg text-lg font-bold mt-5 hover:bg-yellow-600/20 hover:text-yellow-200 transition">
        Go Back Home
      </Link>
    </div>
  );
}   