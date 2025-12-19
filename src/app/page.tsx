import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
//import Terminal from "./components/sections/Terminal";
import Experience from "./components/sections/Experience";

export default function Home() {
  return (
   <>
    <Hero />
    <About />
    {/* <Terminal /> */}
    <Experience />
   </>
  );
}
