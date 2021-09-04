import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";

const Parametres = () => {
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
          <div className="container-fluid">
            <div className="block-header">
              <br />
              <h1>Gestion des administrateurs</h1>
            </div>
            <br />
            <div class="row clearfix">
              <button className="btn waves-effect waves-light">
                <NavLink exact to="/ajout_admin">
                  Administrateur +
                </NavLink>
              </button>
              <div className="col-1"></div>
              <button className="btn waves-effect waves-light">
                <NavLink exact to="/listadmin">
                  Liste des Administrateurs
                </NavLink>
              </button>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Parametres;
