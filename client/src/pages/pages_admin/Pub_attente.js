import React, { useState } from "react";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import ThreadVal from "../../components/ThreadVal";

const Pub_attente = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <div>
      <NavBarAdmin toggle={toggle} />
      <DropdownAdmin isOpen={isOpenNav} toggle={toggle} />
      <div className="container">
        <div className="col-12" style={{ paddingTop: "100px" }}>
          <h1>En attente de validation</h1>
          <div className="container">
            <ThreadVal />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pub_attente;
