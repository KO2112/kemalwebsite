import React from "react";
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

const App = () => (
  <Container>
    <BackgroundVideo autoPlay muted loop>
      <source
        src="https://v3.cdnpk.net/videvo_files/video/free/2015-11/large_preview/Starfield_Fly_Through.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </BackgroundVideo>
    <Section />
    <AboutMeSection />
    <WorkExperienceSection />
    <ProjectsSection />
    <ContactMeSection/>
    <SignMyWebpage/>
  </Container>
);

export default App;
