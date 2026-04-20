import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import LatestPosts from "./components/sections/LatestPosts";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-(--background) text-(--text-primary) transition-colors">
      <Hero />
      <Projects />
      <Experience />
      <LatestPosts />
      <Contact />
    </main>
  );
}
