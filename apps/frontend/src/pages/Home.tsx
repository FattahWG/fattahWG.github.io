import { Hero } from '@/components/Hero';
import { About, EducationSection, ExperienceSection, SkillsSection, Stats } from '@/components/sections';
import { ContactSection, GamesSection, LabSection, ProjectsSection } from '@/components/showcase';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <LabSection />
      <GamesSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
