import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 99, 71, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 99, 71, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 99, 71, 0.5);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const AboutMeSectionWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  scroll-snap-align: start;
  background-color: #111;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 99, 71, 0.05) 0%, rgba(0, 0, 0, 0) 20%),
    radial-gradient(circle at 80% 80%, rgba(255, 99, 71, 0.05) 0%, rgba(0, 0, 0, 0) 20%),
    linear-gradient(135deg, #111 25%, #161616 25%, #161616 50%, #111 50%, #111 75%, #161616 75%, #161616 100%);
  background-size: auto, auto, 20px 20px;
  overflow-x: hidden;
  padding: 20px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 99, 71, 0.5), transparent);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 99, 71, 0.5), transparent);
  }

  @media (max-width: 1366px) {
    min-height: auto;
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const AboutContent = styled.div`
  max-width: 800px;
  padding: 40px;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
  background: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 99, 71, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${glow} 4s infinite ease-in-out;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 99, 71, 0.05) 0%, rgba(0, 0, 0, 0) 50%);
    pointer-events: none;
  }

  @media (max-width: 1366px) {
    padding: 30px;
    max-width: 90%;
  }

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
  }
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  color: #ff6347;
  display: inline-block;
  position: relative;
  text-shadow: 0 0 10px rgba(255, 99, 71, 0.3);
  animation: ${(props) =>
    props.isVisible && !props.isMobile ? fadeIn : "none"} 1.5s ease;
    
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, rgba(255, 99, 71, 0.2), rgba(255, 99, 71, 1), rgba(255, 99, 71, 0.2));
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(255, 99, 71, 0.5);
  }

  @media (max-width: 1366px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 15px;
  animation: ${(props) =>
    props.isVisible && !props.isMobile
      ? props.index % 2 === 0
        ? slideInLeft
        : slideInRight
      : "none"}
    ${(props) => 0.4 + props.index * 0.2}s ease;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 99, 71, 0.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1366px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const Highlight = styled.span`
  color: #ff6347;
  position: relative;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 99, 71, 0.5);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  ${AboutText}:hover &:after {
    transform: scaleX(1);
  }
`;

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  margin: 30px 0 15px;
  color: #ff6347;
  opacity: 0.9;
  text-align: center;
  animation: ${(props) =>
    props.isVisible && !props.isMobile ? fadeIn : "none"} 1.8s ease;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 99, 71, 0.1);
  
  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px;
  }
`;

const SkillBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(255, 99, 71, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} ${props => 1.8 + props.index * 0.1}s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(255, 99, 71, 0.2);
    background: rgba(40, 40, 40, 0.8);
    
    img {
      animation: ${pulse} 1s infinite ease-in-out;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const SkillImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 5px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const SkillName = styled.span`
  font-size: 0.8rem;
  margin-top: 5px;
  opacity: 0.8;
  
  ${SkillBadge}:hover & {
    color: #ff6347;
    opacity: 1;
  }
`;

const AboutMeSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const aboutTextContent = [
    "I have over <Highlight>7+ years</Highlight> of experience as a QA Automation Engineer - SDET and <Highlight>Software development</Highlight>, also, have worked extensively on automation, mostly website, API, mobile, and web services applications.",
    "My knowledge and implementation skills in the <Highlight>Software Development Life Cycle (SDLC)</Highlight> and <Highlight>Software Testing Life Cycle (STLC)</Highlight> are excellent.",
    "I have experience working on <Highlight>Agile projects</Highlight> and have worked closely with product owners, attending various ceremonies such as sprint planning, Scrum, backlog grooming, sprint review, and retrospective.",
    "I have proven abilities in designing and implementing automation frameworks using tools such as <Highlight>Java, Selenium WebDriver, Junit, TestNG, Maven,</Highlight> and <Highlight>Jenkins</Highlight>.",
    "I have gained experience working with various tools, including <Highlight>Java, Selenium WebDriver, Cypress, Playwright, Appium, Maven, Cucumber, TestNG, JUnit, SQL, Git,</Highlight> and many others.",
    "I also have good knowledge of <Highlight>Springboot, React, Unity</Highlight> applications and am able to participate in large and multi-platform projects as well.",
    "I'm a good communicator, I have good analytical and communication skills and can work independently with minimal supervision while also being able to function effectively as part of a team."
  ];

  const skills = [
    { name: "Playwright", img: "https://seeklogo.com/images/P/playwright-logo-22FA8B9E63-seeklogo.com.png" },
    { name: "Selenium", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png" },
    { name: "Cypress", img: "https://static-00.iconduck.com/assets.00/cypress-icon-512x511-29zvfts6.png" },
    { name: "Java", img: "https://cdn.iconscout.com/icon/free/png-256/java-60-1174953.png" },
    { name: "C#", img: "https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" },
    { name: "TypeScript", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
    { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    { name: "Python", img: "https://cdn.iconscout.com/icon/free/png-256/free-python-3628999-3030224.png?f=webp" },
    { name: "Spring", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/1024px-Spring_Framework_Logo_2018.svg.png" },
    { name: "React", img: "https://cdn.iconscout.com/icon/free/png-256/free-react-4-1175110.png?f=webp" }
  ];
  
  // Function to parse and render text with highlighted spans
  const renderWithHighlights = (text) => {
    return text.split(/<Highlight>|<\/Highlight>/).map((part, i) => {
      return i % 2 === 0 ? part : <Highlight key={i}>{part}</Highlight>;
    });
  };

  return (
    <AboutMeSectionWrapper ref={ref}>
      <AboutContent>
        <AboutTitle isVisible={isInView} isMobile={isMobile}>
          About Me
        </AboutTitle>
        
        {aboutTextContent.map((text, index) => (
          <AboutText 
            key={index}
            isVisible={isInView} 
            isMobile={isMobile}
            index={index}
          >
            {renderWithHighlights(text)}
          </AboutText>
        ))}
        
        
        
        <SkillsContainer>
          {skills.map((skill, index) => (
            <SkillBadge key={index} index={index}>
              <SkillImage src={skill.img} alt={skill.name} />
              <SkillName>{skill.name}</SkillName>
            </SkillBadge>
          ))}
        </SkillsContainer>
      </AboutContent>
    </AboutMeSectionWrapper>
  );
};

export default AboutMeSection;