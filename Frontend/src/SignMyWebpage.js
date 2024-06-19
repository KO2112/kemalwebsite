import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 71, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 99, 71, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 71, 0);
  }
`;

const SignMyWebpageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111; /* Dark background color */
  color: #fff; /* White text color */
  padding: 40px 20px;
  box-sizing: border-box;
  scroll-snap-align: start;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background-color: #222; /* Dark background color */
  padding: 40px;
  box-sizing: border-box;
  animation: ${({ isVisible }) =>
    isVisible &&
    css`
      ${fadeIn} 1s ease;
    `};
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #fff;
  border-bottom: 3px solid #fff;
  display: inline-block;
`;

const Subtitle = styled.p`
  color: #ccc;
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const SignatureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

const SignatureCanvasBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 2px dashed #fff; /* White dashed border */
  background-color: #111; /* Dark background color */
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const SignatureCanvasStyled = styled(SignatureCanvas)`
  width: 100%;
  height: 120px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  font-size: 1.2rem;
  color: white;
  background-color: #333;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #222;
    transform: scale(1.05);
  }
`;

const SignatureDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 40px;
`;

const SignedBox = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #fff; /* White border */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
  color: #fff; /* White text color */
  background-color: #222; /* Dark background color */
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    animation: ${pulseAnimation} 1s ease-in-out infinite;
  }
`;

const SignatureImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: contain; /* Ensure the image fits within its container */
  margin-top: 10px; /* Adjust top margin for better centering */
`;

const SignMyWebpage = () => {
  const [name, setName] = useState("");
  const [signatures, setSignatures] = useState([]);
  const sigCanvas = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await fetch("https://kemalwebsite.onrender.com/signatures");
        if (!response.ok) {
          throw new Error("Failed to fetch signatures");
        }
        const data = await response.json();
        setSignatures(data);
      } catch (error) {
        console.error("Error fetching signatures:", error.message);
      }
    };
    fetchSignatures();
  }, []);

  const clearCanvas = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const saveSignature = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      try {
        const response = await fetch("https://kemalwebsite.onrender.com/signatures", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, signature: sigCanvas.current.toDataURL() }),
        });

        if (!response.ok) {
          throw new Error("Failed to save signature");
        }

        const newSignature = await response.json();
        setSignatures([...signatures, newSignature]);
        setName("");
        clearCanvas();
      } catch (error) {
        console.error("Error saving signature:", error.message);
      }
    }
  };

  return (
    <SignMyWebpageWrapper ref={ref}>
      <ContentWrapper isVisible={inView}>
        <Title>Sign My Webpage</Title>
        <Subtitle>Sign below to leave your mark!</Subtitle>
        <SignatureWrapper>
          <SignatureCanvasBox>
            <SignatureCanvasStyled
              ref={sigCanvas}
              penColor="white"
              canvasProps={{ width: 800, height: 120, className: "sigCanvas" }}
            />
          </SignatureCanvasBox>
          <Controls>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={saveSignature}>Save Signature</Button>
          </Controls>
        </SignatureWrapper>
        <SignatureDisplay>
          {signatures.map((signature) => (
            <SignedBox key={signature._id}>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "10px" }}>{signature.name}</div>
              <SignatureImage src={signature.signature} alt="Signature" />
            </SignedBox>
          ))}
        </SignatureDisplay>
      </ContentWrapper>
    </SignMyWebpageWrapper>
  );
};

export default SignMyWebpage;
