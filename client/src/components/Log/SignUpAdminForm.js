import React, { lazy, useState, Suspense } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
} from "mdbreact";

const SignInAdminForm = lazy(() => import("./SignInAdminForm"));

const SignUpAdminForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const renderLoader = () => <p>Loading</p>;

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
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

  return (
    <>
      <Suspense fallback={renderLoader()}>
        {formSubmit ? (
          <>
            <h4 className="success">
              Enregistrement réussi, veuillez-vous connecter!
            </h4>
            <SignInAdminForm />
            <span></span>
          </>
        ) : (
          <MDBCard>
            <MDBCardBody>
              <form action="" onSubmit={handleRegister} id="sign-up-form">
                <p className="text-center py-4">Enregistrement propriétaire</p>
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
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={controlPassword}
                  />
                  <div className="password-confirm error"></div>
                  <br />
                  <input type="checkbox" id="terms" checked />
                  <label htmlFor="terms">
                    {"  "} J'accepte les{" "}
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      conditions générales
                    </a>
                  </label>
                  <div className="terms error"></div>
                </div>
                <div className="text-center py-4 mt-3">
                  <button class="btn waves-effect waves-light" type="submit">
                    Valider inscription
                  </button>
                </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>
                    Yet member? <a href="/">Sign in</a>{" "}
                  </p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        )}
      </Suspense>
    </>
  );
};

export default SignUpAdminForm;
