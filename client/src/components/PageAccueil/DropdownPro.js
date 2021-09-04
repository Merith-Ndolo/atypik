import React, { useContext, lazy, Suspense } from "react";
import { UidContext } from "../UserIdConnect";
import styled from "styled-components";
import { menuData, menuDataPro } from "../../data/MenuData";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Logout = lazy(() => import("../Log/Logout"));

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #cd853f;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

const CloseIcon = styled(FaTimes)`
  color: #000d1a;
`;
const DropdownWrapper = styled.div``;
const DropdownMenu = styled.div`
  display: grid;
  grid-template-colunms: 1fr;
  grid-template-rows: repeat(4, 80px);
  text-align: center;
  margin-bottom: 4rem;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(4, 60px);
  }
`;
const DropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    color: #fff;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        color: #17233e;
        font-weight: bold;
    }
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const DropdownPro = ({ isOpen, toggle }) => {
  const uid = useContext(UidContext);

  const renderLoader = () => <p>Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <DropdownContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <DropdownWrapper>
          <DropdownMenu>
            {uid
              ? menuDataPro.map((item, index) => (
                  <DropdownLink to={item.link} key={index}>
                    {item.title}
                  </DropdownLink>
                ))
              : menuData.map((item, index) => (
                  <DropdownLink to={item.link} key={index}>
                    {item.title}
                  </DropdownLink>
                ))}
            {uid ? (
              <div style={{ paddingRight: "40%" }}>
                <Logout />
              </div>
            ) : (
              <div></div>
            )}
          </DropdownMenu>
          <BtnWrap>
            <Button primary="true" round="true" to="/homepro">
              Accueil
            </Button>
          </BtnWrap>
        </DropdownWrapper>
      </DropdownContainer>
    </Suspense>
  );
};

export default DropdownPro;
