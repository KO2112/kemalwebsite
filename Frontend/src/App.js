import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Section from "./Section";
import AboutMeSection from "./AboutMeSection";
import WorkExperienceSection from "./WorkExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactMeSection from "./ContactMe";
import SignMyWebpage from "./SignMyWebpage";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden; 
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const App = () => {
  const sectionRefs = useRef([]);
  const sections = [
    Section,
    AboutMeSection,
    WorkExperienceSection,
    ProjectsSection,
    ContactMeSection,
    SignMyWebpage,
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentScrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      let currentSectionIndex = sectionRefs.current.findIndex(
        (section) => section.getBoundingClientRect().top <= viewportHeight / 2 && section.getBoundingClientRect().bottom > viewportHeight / 2
      );

      if (currentSectionIndex === -1) {
        currentSectionIndex = 0;
      }

      if (event.key === "ArrowDown" && currentSectionIndex < sectionRefs.current.length - 1) {
        sectionRefs.current[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
      } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
        sectionRefs.current[currentSectionIndex - 1].scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <BackgroundVideo autoPlay muted loop>
        <source
          src="https://v3.cdnpk.net/videvo_files/video/free/2015-11/large_preview/Starfield_Fly_Through.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </BackgroundVideo>
      {sections.map((SectionComponent, index) => (
        <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
          <SectionComponent />
        </div>
      ))}
    </Container>
  );
};

export default App;
