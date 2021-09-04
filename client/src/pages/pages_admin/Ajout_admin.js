import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";

const Ajout_admin = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const role = "administrateur";

  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
          role,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <>
      <div>
        <NavBarAdmin toggle={toggle} />
        <DropdownAdmin isOpen={isOpenNav} toggle={toggle} />
        <div className="row">
          <div className="col-12" style={{ paddingTop: "100px" }}>
            {formSubmit ? (
              <>
                <span
                  className="success"
                  style={{ textAlign: "center", paddingTop: "15%" }}
                >
                  Ajout réussi!
                </span>
                <div class="success-animation">
                  <svg
                    class="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      class="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      class="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>

                <span></span>
              </>
            ) : (
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBCard>
                      <MDBCardBody>
                        <form
                          action=""
                          onSubmit={handleRegister}
                          id="sign-up-form"
                        >
                          <p className="h4 text-center py-4">
                            Nouveau Administrateur
                          </p>
                          <div className="grey-text">
                            <MDBInput
                              htmlFor="pseudo"
                              label="Pseudo"
                              icon="user"
                              type="text"
                              name="pseudo"
                              id="pseudo"
                              onChange={(e) => setPseudo(e.target.value)}
                              value={pseudo}
                            />
                            <div className="pseudo error"></div>
                            <MDBInput
                              htmlFor="email"
                              label="Email"
                              icon="envelope"
                              type="text"
                              name="email"
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                            <div className="email error"></div>
                            <MDBInput
                              htmlFor="password"
                              label="Mot de passe"
                              icon="lock"
                              type="password"
                              name="password"
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                            <div className="password error"></div>
                            <MDBInput
                              htmlFor="password-conf"
                              label="Confirmation mot de passe"
                              icon="exclamation-triangle"
                              type="password"
                              name="password"
                              id="password-conf"
                              onChange={(e) =>
                                setControlPassword(e.target.value)
                              }
                              value={controlPassword}
                            />
                            <div className="password-confirm error"></div>
                          </div>
                          <div className="text-center py-4 mt-3">
                            <button
                              className="btn waves-effect waves-light"
                              type="submit"
                            >
                              Valider
                            </button>
                          </div>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ajout_admin;
