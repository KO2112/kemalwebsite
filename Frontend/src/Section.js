import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  scroll-snap-align: start;
  background-color: ${(props) => props.bgColor || "transparent"};
  overflow-x: hidden; 
`;

const Content = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  opacity: 0; /* Initial opacity set to 0 */
  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${fadeIn} 1s ease forwards
        `
      : "none"};
`;

const ProfileTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 0px 0 20px;
  color: white;
  text-shadow: 1px 1px 2px black;
`;

const Section = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper ref={sectionRef}>
      <Content>
        <ProfileTitle>QA Automation Engineer / Software Developer</ProfileTitle>
        <ProfileImage
          src="https://i.ibb.co/8rpcCLT/1716893197794.jpg"
          alt="Profile Picture"
        />
        <Name isVisible={isVisible}>Kemal Orhan</Name>
      </Content>
    </SectionWrapper>
  );
};

export default Section;
