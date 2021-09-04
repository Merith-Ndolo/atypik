import { MDBFooter } from "mdbreact";
import React from "react";

const Footer = () => {
  return (
    <MDBFooter style={{ backgroundColor: "#3a3a3a" }}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <span style={{ color: "#fff", fontSize: "20px" }}>A propos</span>
            <hr />
            <ul>
              <li>
                <a href="#" style={{ color: "white" }}>
                  Qui sommes-nous?
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Devenez propiétaire
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Dévenez locataire
                </a>
              </li>
            </ul>
            <span style={{ color: "#fff", fontSize: "20px" }}>
              Nos applications
            </span>
            <hr />
            <img
              src="./img/pwa.png"
              alt="appli"
              width="120"
              height="40"
              quality="60"
              format="webp"
              loading="lazy"
            />
          </div>
          <div className="col-4">
            <span style={{ color: "#fff", fontSize: "20px" }}>légalités</span>
            <hr />
            <ul>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Conditions générales d'utilisation
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Vie privée et cookies
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Vos droits et obligations
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <span style={{ color: "#fff", fontSize: "20px" }}>Questions</span>
            <hr />
            <ul>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Aide
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Sécurité de paiement
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Status de nos service
                </a>
              </li>
              <li>
                {" "}
                <a href="#" style={{ color: "white" }}>
                  Nos conseillé(e)s à votre écoute
                </a>
              </li>
            </ul>
            <span style={{ color: "#fff", fontSize: "20px" }}>
              Notre présence
            </span>
            <hr />
            <div className="container">
              <a
                href="https://www.facebook.com/AtypikHouse-G4-111309504389945"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="img_dec"
                  src="./img/logo/facebook.png"
                  alt="facebook"
                  width="50"
                  quality="60"
                  format="webp"
                  loading="lazy"
                  height="50"
                />
              </a>{" "}
              <a
                href="https://www.instagram.com/atypikhouse.g4/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="img_dec"
                  src="./img/logo/instagram.png"
                  alt="instagram"
                  width="50"
                  quality="60"
                  format="webp"
                  loading="lazy"
                  height="50"
                />
              </a>{" "}
              <a
                href="https://twitter.com/AtypikhouseG"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="img_dec"
                  src="./img/logo/twitter.png"
                  alt="twitter"
                  width="50"
                  quality="60"
                  format="webp"
                  loading="lazy"
                  height="50"
                />
              </a>{" "}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <img
                  className="img_dec"
                  src="./img/logo/linkedin.png"
                  alt="linkedin"
                  width="50"
                  height="50"
                  quality="60"
                  format="webp"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MDBFooter>
  );
};

export default Footer;
