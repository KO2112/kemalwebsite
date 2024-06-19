import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";

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

const colorChange = keyframes`
  0% { color: #ff6347; }
  20% { color: #e5533d; }
  40% { color: #f0a500; }
  60% { color: #32cd32; }
  80% { color: #1e90ff; }
  100% { color: #ff6347; }
`;

const ContactSectionWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111;
  color: white;
  padding: 40px 20px;
  box-sizing: border-box;
  scroll-snap-align: start;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5));
  padding: 50px 30px;
  box-sizing: border-box;
  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${fadeIn} 1s ease;
    `};
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ff6347;
  border-bottom: 3px solid #ff6347;
  display: inline-block;
`;

const ContactItem = styled.div`
  margin-bottom: 30px;
  font-size: 1.5rem;
  color: #ddd;
`;

const ContactLink = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  animation: ${colorChange} 2s infinite;
`;

const Button = styled.button`
  font-size: 1.5rem;
  color: white;
  background-color: #ff6347;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e5533d;
    transform: scale(1.05);
  }
`;

const PhoneNumber = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6347;
  }

  span {
    display: ${({ isVisible }) => (isVisible ? "inline" : "none")};
  }
`;

const ContactMeSection = () => {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.5,
  });

  const togglePhoneVisibility = () => {
    setIsPhoneVisible(!isPhoneVisible);
  };

  return (
    <ContactSectionWrapper ref={ref}>
      <ContentWrapper isVisible={inView}>
        <Title>Contact Me</Title>
        <ContactItem>
          <strong>Email:</strong>{" "}
          <ContactLink href="mailto:kemal182182@gmail.com">
            kemal182182@gmail.com
          </ContactLink>
        </ContactItem>
        <ContactItem>
          <strong>LinkedIn:</strong>{" "}
          <ContactLink
            href="https://www.linkedin.com/in/yagiz-orhan-28729b229/"
            target="_blank"
          >
            Kemal Orhan LinkedIn
          </ContactLink>
        </ContactItem>
        <PhoneNumber isVisible={isPhoneVisible} onClick={togglePhoneVisibility}>
          <strong>Phone Number (click to reveal):</strong>{" "}
          <span>{isPhoneVisible ? "+44 7419208820" : "Click to reveal"}</span>
        </PhoneNumber>
        <ContactItem>
          <Button onClick={() => window.open("https://drive.google.com/file/d/1I_fUhaYHjbvlarPUA8Hz1eWC0kKvLXSC/view?usp=drive_link")}>
            Download CV
          </Button>
        </ContactItem>
      </ContentWrapper>
    </ContactSectionWrapper>
  );
};

export default ContactMeSection;
