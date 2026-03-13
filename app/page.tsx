import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Certificates from "@/components/sections/Certificates";
import Section from "@/components/ui/Section";

export default function Home() {
  return (
    <div className="pb-20 space-y-20 lg:space-y-32">
      <Section id="introduction">
        <Hero />
      </Section>
      <Section id="tech-stack">
        <TechStack />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="certificates">
        <Certificates />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </div>
  );
}
