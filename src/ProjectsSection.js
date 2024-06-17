import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #111; 
  padding: 20px;
  box-sizing: border-box;
  scroll-snap-align: start;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  background-color: rgba(20, 20, 20, 0.9); 
  padding: 50px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 50px;
  padding-bottom: 10px;
  color: #fff;
  border-bottom: 3px solid #ff6347;
  display: inline-block;
  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${fadeIn} 1s ease;
    `};
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${({ isVisible, delay }) =>
    isVisible &&
    css`
      ${fadeIn} ${delay}s ease;
    `};
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #ff6347;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 3px;
    background-color: #ff6347;
    transform-origin: bottom left;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  ${ProjectCard}:hover &::after {
    transform: scaleX(1);
  }
`;

const ProjectDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #ddd;
`;

const ProjectLink = styled.a`
  font-size: 1.2rem;
  color: #ff6347;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <SectionWrapper ref={ref}>
      <ContentWrapper>
        <Title isVisible={isInView}>Projects</Title>
        <ProjectGrid>
          <ProjectCard isVisible={isInView} delay={0.5}>
            <ProjectTitle>My Website with React</ProjectTitle>
            <ProjectDescription>
              A personal website built using React.js to showcase my portfolio and projects.
            </ProjectDescription>
            <ProjectLink href="kemalorhan.com" target="_blank">
              View Project
            </ProjectLink>
          </ProjectCard>
          <ProjectCard isVisible={isInView} delay={1}>
            <ProjectTitle>Jira 2</ProjectTitle>
            <ProjectDescription>
              A clone of the popular project management tool, Jira, built to demonstrate my full-stack development skills.
            </ProjectDescription>
            <ProjectLink href="http://100.26.197.143/" target="_blank">
              View Project
            </ProjectLink>
          </ProjectCard>
        </ProjectGrid>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default ProjectsSection;
