import React, { useContext, useState } from "react";
import Index_admin from "../components/Log/Index_admin";
import { UidContext } from "../components/UserIdConnect";
import UpdateInfoProfil from "../components/Profil/UpdateInfoProfil";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";
import DropdownAdmin from "../components/PageAccueil/DropDownAdmin";
import NavBarAdmin from "../components/PageAccueil/NavBarAdmin";

const Profil_admin = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBarAdmin toggle={toggle} />
      <DropdownAdmin isOpen={isOpen} toggle={toggle} />
      <div style={{ paddingTop: "60px" }}>
        <div className="row">
          <div className="col-12">
            <div>
              {uid ? (
                <UpdateInfoProfil />
              ) : (
                <>
                  <div className="row">
                    <div className="col-sm">
                      <Index_admin signin={true} signup={false} />
                    </div>
                    <div className="col-sm">
                      <img
                        width="100%"
                        height="100%"
                        src="./img/imag_3.svg"
                        alt="imag_1"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil_admin;
