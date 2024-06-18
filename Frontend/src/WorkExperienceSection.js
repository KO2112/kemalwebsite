import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const WorkExperienceSectionWrapper = styled.div`
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
  overflow-x: hidden; 
`;

const WorkExperienceContent = styled.div`
  max-width: 800px;
  padding: 40px;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(17, 17, 17, 0.9);
`;

const WorkExperienceTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #a0a0a0;
  display: inline-block;
  color: #ff6347;
  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${slideInLeft} 1s ease;
    `};
`;

const WorkExperienceEntrySlideRight = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-left: 3px solid #ff6347;
  animation: ${({ isVisible, delay }) =>
    isVisible &&
    css`
      ${slideInRight} ${delay}s ease;
    `};
`;

const WorkExperienceEntrySlideLeft = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-left: 3px solid #ff6347;
  animation: ${({ isVisible, delay }) =>
    isVisible &&
    css`
      ${slideInLeft} ${delay}s ease;
    `};
`;

const WorkExperienceEntrySlideRightAgain = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-left: 3px solid #ff6347;
  animation: ${({ isVisible, delay }) =>
    isVisible &&
    css`
      ${slideInRight} ${delay}s ease;
    `};
`;

const CompanyTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const JobTitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 5px;
`;

const DateRange = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const Responsibilities = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
`;

const WorkExperienceSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  return (
    <WorkExperienceSectionWrapper ref={ref}>
      <WorkExperienceContent>
        <WorkExperienceTitle isVisible={isInView}>
          Employment History
        </WorkExperienceTitle>
        <WorkExperienceEntrySlideRight isVisible={isInView} delay={0.5}>
          <CompanyTitle>Lenvi / Equinti</CompanyTitle>
          <JobTitle>QA Automation Team Lead</JobTitle>
          <DateRange>2023-07 to present</DateRange>
          <Responsibilities>
            Managed automation frameworks for multiple clients, specializing in
            Playwright and Cypress. Expertise includes API testing, manual
            testing, and UI testing using Java, Selenium, Rest Assured, JUnit,
            and Maven. Fostered communication with product owners and
            developers to integrate testing seamlessly into SDLC, ensuring
            high-quality software delivery.
          </Responsibilities>
        </WorkExperienceEntrySlideRight>
        <WorkExperienceEntrySlideLeft isVisible={isInView} delay={1}>
          <CompanyTitle>OAK Technology</CompanyTitle>
          <JobTitle>QA Automation Engineer</JobTitle>
          <DateRange>2021-06 to 2023-09</DateRange>
          <Responsibilities>
            Leveraged Java and Selenium WebDriver for comprehensive software
            testing. Developed and maintained automation frameworks using
            JUnit, Maven, and Cucumber. Contributed to Agile SDLC/STLC stages,
            employing Jenkins for CI/CD and AWS for remote testing. Utilized
            Jira, Git/GitHub, and REST Assured for project management, version
            control, and API testing.
          </Responsibilities>
        </WorkExperienceEntrySlideLeft>
        <WorkExperienceEntrySlideRightAgain isVisible={isInView} delay={1.5}>
          <CompanyTitle>Equipment4motorcycle</CompanyTitle>
          <JobTitle>QA Automation Engineer</JobTitle>
          <DateRange>2019-03 to 2021-05</DateRange>
          <Responsibilities>
            Developed hybrid automation frameworks using Cypress and Selenium for
            web testing. Collaborated on mobile testing with Appium and
            contributed to performance testing with JMeter.
          </Responsibilities>
        </WorkExperienceEntrySlideRightAgain>
      </WorkExperienceContent>
    </WorkExperienceSectionWrapper>
  );
};

export default WorkExperienceSection;
