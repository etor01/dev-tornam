import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
//import Terminal from "./components/sections/Terminal";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";


export default function Home() {
  return (
   <div>
      <Hero />
      <About />
      {/* <Terminal /> */}
      <Experience />
      <Projects />
      <Contact />
   </div>
  );
}
