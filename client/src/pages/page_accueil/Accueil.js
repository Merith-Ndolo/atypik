import React, { lazy, Suspense, useState } from "react";
import { InfoData } from "../../data/InfoData";
import { SliderData } from "../../data/SliderData";
import { useSelector } from "react-redux";
import { Button } from "../../components/PageAccueil/Button";
import "../../style/index.css";
require("react-dom");

//lazy
const GlobalStyle = lazy(() => import("./globalStyles"));
const NavBar = lazy(() => import("../../components/PageAccueil/NavBar"));
const Dropdown = lazy(() => import("../../components/PageAccueil/Dropdown"));
const Hero = lazy(() => import("../../components/PageAccueil/Hero"));
const InfoSection = lazy(() =>
  import("../../components/PageAccueil/InfoSection")
);
const Footer = lazy(() => import("../../components/PageAccueil/Footer"));

export const Accueil = () => {
  const [isOpen, setIsOpen] = useState(false);
  window.React2 = require("react");
  console.log(window.React1 === window.React2);
  const userData = useSelector((state) => state.userReducer);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderLoader = () => <p>Loading</p>;

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <GlobalStyle />
        <NavBar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <Hero slides={SliderData} />

        <h1
          style={{
            fontSize: "30px",
            paddingTop: "15px",
            textAlign: "center",
            backgroundColor: "ButtonHighlight",
            fontWeight: "normal",
            color: "#3a3a3a",
          }}
        >
          Trouvez l'habitat atypique qui vous correspond!
        </h1>
        <ul>
          <li>
            {" "}
            <div className="container" style={{ paddingTop: "25px" }}>
              <Button to="/home" style={{ float: "right" }}>
                Consulter les offres
              </Button>
              {userData.role === "propriétaire" && (
                <>
                  <br />
                  <Button to="/newpost">Déposer une annonce</Button>
                </>
              )}
              {userData.role === "client" ? (
                <div></div>
              ) : (
                <>
                  <div className="hide-btn">
                    <br />
                    <Button
                      to="/profil_pro"
                      style={{
                        float: "right",
                        marginTop: "-20px",
                        marginRight: "10px",
                      }}
                    >
                      Déposer une annonce
                    </Button>
                  </div>
                  <div className="show-btn">
                    <br />
                    <Button
                      to="/profil_pro"
                      style={{
                        float: "right",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      Déposer une annonce
                    </Button>
                  </div>
                </>
              )}
            </div>
          </li>
        </ul>
        <InfoSection {...InfoData} />
        <Footer />
      </Suspense>
    </>
  );
};
