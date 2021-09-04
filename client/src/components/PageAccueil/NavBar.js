import React, { useContext, lazy, Suspense } from "react";
import { UidContext } from "../UserIdConnect";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { menuData, menuDataLocaitaire } from "../../data/MenuData";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

const Logout = lazy(() => import("../Log/Logout"));

const Nav = styled.nav`
  color: #3a3a3a;
  height: 60px;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  padding: 1rem 5rem 0 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background-color: #fff;
`;

const NavLink = css`
  color: #3a3a3a;
  display: flex;
  font-weight: bold;
  align-items: center;
  padding: 0 1rem 0 2rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    color: #cd853f;
    font-weight: bold;
  }
`;

const NavLinkLogo = css`
  color: #3a3a3a;
  display: flex;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    color: #cd853f;
    font-weight: bold;
  }
`;

const Logo = styled(Link)`
  ${NavLinkLogo}
`;

const MenuBars = styled(FaBars)`
  display: none;
  cursor: pointer;
  margin-top: 15px;
  margin-right: -50px;

  &:hover {
    color: #cd853f;
    font-weight: bold;
  }

  @media screen and (max-width: 1007px) {
    display: block;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 1007px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBar = ({ toggle }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const renderLoader = () => <p>Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <Nav>
        <Logo to="/accueil">
          <span
            style={{
              color: "#3a3a3a",
              fontFamily: "fantasy",
              fontSize: "30px",
            }}
          >
            AtypikHouse
          </span>
        </Logo>
        <MenuBars onClick={toggle} />
        <NavMenu>
          {uid
            ? menuDataLocaitaire.map((item, index) => (
                <NavMenuLinks to={item.link} key={index}>
                  {item.title}
                </NavMenuLinks>
              ))
            : menuData.map((item, index) => (
                <NavMenuLinks to={item.link} key={index}>
                  {item.title}
                </NavMenuLinks>
              ))}
          {uid ? <Logout /> : <div></div>}
        </NavMenu>
      </Nav>
    </Suspense>
  );
};

export default NavBar;
