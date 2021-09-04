import React, { useContext, useState } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/UserIdConnect";
import UpdateInfoProfil from "../components/Profil/UpdateInfoProfil";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";
import NavBar from "../components/PageAccueil/NavBar";
import Dropdown from "../components/PageAccueil/Dropdown";

const Profil = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />

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
                      <Log signin={true} signup={false} />
                    </div>
                    <div className="col-sm">
                      <img
                        width="100%"
                        height="100%"
                        src="./img/imag_1.svg"
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

export default Profil;
