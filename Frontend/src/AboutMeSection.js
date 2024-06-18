import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
  }
`;

const scrolling = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const AboutMeSectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  scroll-snap-align: start;
  background-color: #111;
  overflow-x: hidden;
`;

const AboutContent = styled.div`
  max-width: 800px;
  padding: 40px;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(17, 17, 17, 0.9);
  overflow: hidden; 
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #a0a0a0;
  display: inline-block;
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 1.7s ease;
  color: #ff6347;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 10px;
  animation: ${(props) => (props.isVisible ? slideInRight : "none")}
    ${(props) => props.delay}s ease;
`;

const Highlight = styled.span`
  color: #ff6347;
`;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-top: 20px; 
`;

const SliderItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; 
  ${(props) =>
    props.isVisible
      ? css`
          animation: ${scrolling} 10s linear infinite;
        `
      : "animation: none;"}
`;

const SliderImage = styled.img`
  width: 50px; 
  height: auto; 
  margin: 0 5px; 
`;

const AboutMeSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <AboutMeSectionWrapper ref={ref}>
      <AboutContent>
        <AboutTitle isVisible={isInView}>About Me</AboutTitle>
        <AboutText isVisible={isInView} delay={0.5}>
          I have over <Highlight>5+ years</Highlight> of experience as a QA
          Automation Engineer - SDET and{" "}
          <Highlight>Software development</Highlight>, also, have worked
          extensively on automation, mostly website, API, mobile, and web
          services applications.
        </AboutText>
        <AboutText isVisible={isInView} delay={0.7}>
          My knowledge and implementation skills in the{" "}
          <Highlight>Software Development Life Cycle (SDLC)</Highlight> and{" "}
          <Highlight>Software Testing Life Cycle (STLC)</Highlight> are
          excellent.
        </AboutText>
        <AboutText isVisible={isInView} delay={0.9}>
          I have experience working on <Highlight>Agile projects</Highlight>{" "}
          and have worked closely with product owners, attending various
          ceremonies such as sprint planning, Scrum, backlog grooming, sprint review, and retrospective.
        </AboutText>
        <AboutText isVisible={isInView} delay={1.1}>
          I have proven abilities in designing and implementing automation
          frameworks using tools such as{" "}
          <Highlight>
            Java, Selenium WebDriver, Junit, TestNG, Maven,
          </Highlight>{" "}
          and <Highlight>Jenkins</Highlight>.
        </AboutText>
        <AboutText isVisible={isInView} delay={1.3}>
          I have gained experience working with various tools, including{" "}
          <Highlight>
            Java, Selenium WebDriver, Cypress, Playwright, Appium, Maven,
            Cucumber, TestNG, JUnit, SQL, Git,
          </Highlight>{" "}
          and many others.
        </AboutText>
        <AboutText isVisible={isInView} delay={1.5}>
          I also have good knowledge of{" "}
          <Highlight>Springboot, React, Unity</Highlight> applications and am
          able to participate in large and multi-platform projects as well.
        </AboutText>
        <AboutText isVisible={isInView} delay={1.7}>
          I'm a good communicator, I have good analytical and communication
          skills and can work independently with minimal supervision while
          also being able to function effectively as part of a team.
        </AboutText>
        <SliderWrapper>
          <SliderItems isVisible={isInView}>
            <SliderImage
              src="https://seeklogo.com/images/P/playwright-logo-22FA8B9E63-seeklogo.com.png"
              alt="Playwright"
            />
            <SliderImage
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png"
              alt="Selenium"
            />
            <SliderImage
              src="https://static-00.iconduck.com/assets.00/cypress-icon-512x511-29zvfts6.png"
              alt="Cypress"
            />
            <SliderImage
              src="https://cdn.iconscout.com/icon/free/png-256/java-60-1174953.png"
              alt="Java"
            />
            <SliderImage
              src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png"
              alt="C#"
            />
            <SliderImage
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
              alt="TypeScript"
            />
            <SliderImage
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              alt="JavaScript"
            />
            <SliderImage
              src="https://cdn.iconscout.com/icon/free/png-256/free-python-3628999-3030224.png?f=webp"
              alt="Python"
            />
            <SliderImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/1024px-Spring_Framework_Logo_2018.svg.png"
              alt="Spring"
            />
            <SliderImage
              src="https://cdn.iconscout.com/icon/free/png-256/free-react-4-1175110.png?f=webp"
              alt="React"
            />
          </SliderItems>
        </SliderWrapper>
      </AboutContent>
    </AboutMeSectionWrapper>
  );
};

export default AboutMeSection;
