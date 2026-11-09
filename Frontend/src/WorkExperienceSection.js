import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

const WorkExperienceSectionWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #111;
  background-image: linear-gradient(45deg, #111 25%, #1a1a1a 25%, #1a1a1a 50%, #111 50%, #111 75%, #1a1a1a 75%, #1a1a1a 100%);
  background-size: 20px 20px;
  padding: 40px 20px;
  scroll-snap-align: start;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,99,71,0.1) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  width: 90%;
  margin: 40px auto 0;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255,99,71,0.2), rgba(255,99,71,0.8), rgba(255,99,71,0.2));
    border-radius: 2px;
    box-shadow: 0 0 15px rgba(255,99,71,0.6);
  }
  
  @media (max-width: 768px) {
    &:before {
      left: 30px;
    }
  }
`;

const WorkExperienceTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff6347;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1.5px;
  position: relative;
  text-shadow: 0 0 10px rgba(255,99,71,0.5);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100%;  /* Full width underline from e to y */
    height: 4px;
    background: linear-gradient(to right, rgba(255,99,71,0.2), rgba(255,99,71,1), rgba(255,99,71,0.2));
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(255,99,71,0.6);
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  padding-bottom: 50px;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #ff6347;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 10px rgba(255,99,71,0.8);
  
  @media (max-width: 768px) {
    left: 32px;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  padding: 25px;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  position: relative;
  border-left: 4px solid #ff6347;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%);
    border-radius: 12px;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(255, 99, 71, 0.3);
    border-left: 4px solid #ff8c74;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompanyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #ff8c74;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #ff8c74;
    transition: width 0.3s ease;
  }
  
  ${TimelineContent}:hover &:after {
    width: 100%;
  }
`;

const JobTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ffffff;
`;

const DateRange = styled.p`
  font-size: 1rem;
  margin-bottom: 12px;
  font-style: italic;
  color: #ccc;
  display: inline-block;
  padding: 4px 10px;
  background-color: rgba(255, 99, 71, 0.2);
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(255, 99, 71, 0.2);
`;

const Responsibilities = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #e0e0e0;
  position: relative;
  padding-left: 12px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ff6347;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 3px 8px;
  background-color: rgba(255, 99, 71, 0.15);
  border-radius: 4px;
  color: #ff8c74;
  display: inline-flex;
  align-items: center;
  
  &:before {
    content: '#';
    margin-right: 2px;
    opacity: 0.7;
  }
`;

const WorkExperienceSection = () => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  const experiences = [
    {
      company: "Armoni",
      title: "Senior QA Automation Lead",
      dates: "2026-02 to Current",
      position: "right",
      delay: 0.1,
      responsibilities:
        "Led the transition to AI-assisted QA for healthcare software supporting people with visible and invisible disabilities across three continents. Built and maintained automation with Playwright, Postman, Azure, and Appium, and tested AI and LLM-powered applications.",
      tags: ["AI in Testing", "LLM Testing", "Playwright", "Postman", "Appium", "Azure"]
    },
    {
      company: "CreateFuture / FanDuel",
      title: "Senior QA Engineer",
      dates: "2025-08 to 2026-02",
      position: "left",
      delay: 0.2,
      responsibilities:
        "Helped make QA automation more dependable and efficient across a business with 13 separate automation frameworks. Validated Java version upgrades across services, maintained Cypress and Playwright frameworks, supported new automation suites, and performed JSON-RPC API, database, and manual testing.",
      tags: ["AI in Testing", "Java", "Cypress", "Playwright", "JSON-RPC", "API Testing", "Database Testing"]
    },
    {
      company: "RaSoft",
      title: "Senior QA Engineer",
      dates: "2025-03 to 2025-08",
      position: "right",
      delay: 0.3,
      responsibilities:
        "Delivered UI and API automation with Playwright and Cypress using TypeScript, alongside Postman and REST Assured testing. Also performed SQL database, Appium mobile, and JMeter performance testing, and supported CI/CD through Azure DevOps.",
      tags: ["Playwright", "Cypress", "TypeScript", "Postman", "REST Assured", "Appium", "JMeter", "Azure DevOps"]
    },
    {
      company: "IBM / Arcadis",
      title: "QA Consultant",
      dates: "2024-09 to 2025-03",
      position: "left",
      delay: 0.5,
      responsibilities:
        "Helped move QA toward AI-assisted testing on the Arcadis engagement. Performed automation and API testing with Selenium, REST Assured, Appium, and Postman, and worked with IBM Maximo.",
      tags: ["AI in Testing", "Selenium", "REST Assured", "Appium", "Postman", "Maximo"]
    },
    {
      company: "Lenvi / Equiniti",
      title: "QA Automation Team Lead",
      dates: "2023-09 to 2024-09",
      position: "right",
      delay: 0.7,
      responsibilities:
        "Managed client automation frameworks using Playwright and Cypress, covering API, manual, and UI testing. Also used Java, Selenium, REST Assured, JUnit, and Maven to support efficient testing.",
      tags: ["Playwright", "Cypress", "Java", "Selenium", "REST Assured", "JUnit", "Maven", "Team Lead"]
    },
    {
      company: "OAK Technology",
      title: "QA Automation Engineer",
      dates: "2021-06 to 2023-09",
      position: "left",
      delay: 0.9,
      responsibilities:
        "Developed and maintained test automation frameworks using Java, Selenium WebDriver, and JUnit, and performed both manual and automated testing.",
      tags: ["Java", "Selenium WebDriver", "JUnit", "Automation Testing", "Manual Testing"]
    },
    {
      company: "E4M",
      title: "QA Automation Engineer",
      dates: "2019-03 to 2021-05",
      position: "right",
      delay: 1.1,
      responsibilities:
        "Built and maintained end-to-end web tests with Cypress and Selenium, and contributed to performance testing with JMeter. Also worked with Playwright, TypeScript, Java, REST Assured, API testing, and mobile testing.",
      tags: ["Cypress", "Selenium", "Playwright", "TypeScript", "Java", "API Testing", "Mobile Testing", "JMeter"]
    },
  ];

  return (
    <WorkExperienceSectionWrapper ref={ref}>
      <WorkExperienceTitle isVisible={isInView}>Employment History</WorkExperienceTitle>
      <TimelineContainer>
        {experiences.map((exp, index) => (
          <TimelineItem 
            key={index}
            position={exp.position}
            isVisible={isInView}
            delay={exp.delay}
          >
            <TimelineDot />
            <TimelineContent>
              <CompanyTitle>{exp.company}</CompanyTitle>
              <JobTitle>{exp.title}</JobTitle>
              <DateRange>{exp.dates}</DateRange>
              <Responsibilities>{exp.responsibilities}</Responsibilities>
              <Tags>
                {exp.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </Tags>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </WorkExperienceSectionWrapper>
  );
};

export default WorkExperienceSection;