import React, { useContext, useState } from "react";
import { UidContext } from "../components/UserIdConnect";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";
import NavBar from "../components/PageAccueil/NavBar";
import Dropdown from "../components/PageAccueil/Dropdown";
import Forgot from "../components/Log/Forgot";

const ForgotView = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />

      <div className="container" style={{ paddingTop: "60px" }}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm">
                <Forgot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotView;
