import React, { useContext, useState } from "react";
import { UidContext } from "../components/UserIdConnect";
import ThreadsFavoris from "../components/ThreadsFavoris";
import Dropdown from "../components/PageAccueil/Dropdown";
import NavBar from "../components/PageAccueil/NavBar";

const Favoris = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container" style={{ paddingTop: "80px" }}>
        <div className="row">
          <div className="col-12">
            <h2>Liste de mes favoris</h2>
            <div className="main">
              <div className="home-header"></div>
              {uid && <ThreadsFavoris />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favoris;
