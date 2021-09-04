import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "./Button";

const InfoSection = () => {
  const sectionData = useSelector((state) => state.sectionReducer);
  const userData = useSelector((state) => state.userReducer);

  const Section = styled.section`
    width: 100%;
    height: 100%;
    padding: 0 0 0 0;
  `;

  const Container = styled.div`
    width: 100%;
    padding: 2rem calc((100vw - 1300px) / 2);
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;

  const ColunmLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 1.4;
    padding: 1rem 2rem;
    order: ${({ reverse }) => (reverse ? "1" : "2")};

    p {
      margin-bottom: 2rem;
    }
  `;

  const ColumnRight = styled.div`
    padding: 1rem 2rem;
    order: ${({ reverse }) => (reverse ? "1" : "2")};

    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
      order: ${({ reverse }) => (reverse ? "2" : "1")};
    }

    img {
      border-radius: 13px;
      width: 500px;
      height: 500px;
      object-fit: cover;

      @media screen and (max-width: 768px) {
        width: 90%;
        height: 90%;
      }
    }
  `;

  if (!Array.isArray(sectionData) || sectionData.length <= 0) {
    return null;
  }

  return (
    <Section>
      {sectionData.map((section, index) => {
        if (section.reverse === true) {
          return (
            <Container>
              <ColunmLeft>
                <h2 key={index}>{section.titre}</h2>
                <p key={index}>{section.paragraph}</p>
              </ColunmLeft>
              <ColumnRight reverse>
                <picture>
                  <img
                    src={section.picture}
                    alt="location"
                    key={index}
                    className="lazyload"
                    width="1208"
                    quality="60"
                    format="webp"
                    loading="lazy"
                    height="50"
                  />
                </picture>
              </ColumnRight>
            </Container>
          );
        } else if (section.reverse === false) {
          return (
            <Container>
              <ColunmLeft>
                <h2 key={index}>{section.titre}</h2>
                <p key={index}>{section.paragraph}</p>
                {userData.role === "administrateur" ? (
                  <i class="fas fa-arrow-circle-right"></i>
                ) : (
                  <Button to="/home">Nos bons plans</Button>
                )}
              </ColunmLeft>
              <ColumnRight>
                <picture>
                  <img
                    src={section.picture}
                    alt="location"
                    key={index}
                    width="1208"
                    className="lazyload"
                    height="50"
                    quality="60"
                    format="webp"
                    loading="lazy"
                  />
                </picture>
              </ColumnRight>
            </Container>
          );
        }
      })}
    </Section>
  );
};

export default InfoSection;
