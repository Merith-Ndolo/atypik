import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";

const HeroSection = styled.section`
  height: 60vh;
  max-height: 1100px;
  position: relative;
  overflow: hidden;
`;

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const HeroSlide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const HeroSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0vh;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100% - 100px);
  color: #fff;

  h2 {
    font-size: clamp(1rem, 8vw, 2rem);
    font-weight: bolder;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    text-align: left;
    margin-bottom: 0.8rem;
    color: #fff;
  }

  h3 {
    margin-bottom: 1.2rem;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    color: #fff;
  }
`;

// const Arrow = styled(IoMdArrowRoundForward)`
//   margin-left: 0.5rem;
// `;

const SliderButtons = styled.div`
    position absolute;
    bottom: 50px;
    right: 50px;
    display: flex;
    z-index: 10;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #17233e;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;

  &:hover {
    background: #f39200;
    transform: scale(1.05);
  }
`;

const PrevArrow = styled(IoArrowBack)`
  ${arrowButtons}
`;

const NextArrow = styled(IoArrowForward)`
  ${arrowButtons}
`;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timeout = useRef(null);
  const paramData = useSelector((state) => state.paramReducer);
  const length = paramData.length;

  /* useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]); */

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === length - 1 ? 0 : current + 1);

    // console.log(current);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === 0 ? length - 1 : current - 1);

    // console.log(current);
  };

  if (!Array.isArray(paramData) || paramData.length <= 0) {
    return null;
  }

  return (
    <HeroSection>
      <HeroWrapper>
        {paramData.map((slide, index) => {
          return (
            <HeroSlide key={index}>
              {index === current && (
                <HeroSlider>
                  <HeroImage
                    src={slide.picture}
                    className="lazyload"
                    alt="location"
                    width="1208"
                    height="50"
                    quality="60"
                    format="webp"
                    loading="lazy"
                  />
                  <HeroContent>
                    {/* <h2>{slide.titre}</h2>
                    <h3>
                      {slide.prix}€ / {slide.temps}
                    </h3> */}
                  </HeroContent>
                </HeroSlider>
              )}
            </HeroSlide>
          );
        })}
        <SliderButtons>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </SliderButtons>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
