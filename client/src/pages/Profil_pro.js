import React, { lazy, Suspense, useContext, useState } from "react";
import { UidContext } from "../components/UserIdConnect";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";

const Pro = lazy(() => import("../components/Log/Index_pro"));
const NavBarPro = lazy(() => import("../components/PageAccueil/NavBarPro"));
const DropdownPro = lazy(() => import("../components/PageAccueil/DropdownPro"));
const UpdateInfoProfil = lazy(() =>
  import("../components/Profil/UpdateInfoProfil")
);

const Profil_pro = () => {
  const uid = useContext(UidContext);

  const renderLoader = () => <p>Loading</p>;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <NavBarPro toggle={toggle} />
        <DropdownPro isOpen={isOpen} toggle={toggle} />
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
                        <Pro signin={true} signup={false} />
                      </div>
                      <div className="col-sm">
                        <img
                          width="100%"
                          height="100%"
                          src="./img/imag_2.svg"
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
      </Suspense>
    </>
  );
};

export default Profil_pro;
