import React, { useState, lazy, Suspense } from "react";
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
import Recaptcha from "react-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = lazy(() => import("./SignInForm"));

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [verify, setVerify] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [tel, setTel] = useState("");
  const role = "client";

  const renderLoader = () => <p>Loading</p>;

  const verifyCallback = (res) => {
    setVerify(true);
  };

  const notifySuccess = () => {
    toast(
      "Un mail de confirmation vous a été envoyé, veuillez consulter votre boite mail!",
      {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const telError = document.querySelector(".tel.error");
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
          tel,
          password,
          role,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            telError.innerHTML = res.data.errors.tel;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
            notifySuccess();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const recaptchaLoaded = () => {
    console.log("reussi");
  };

  return (
    <>
      <Suspense fallback={renderLoader()}>
        {formSubmit ? (
          <>
            <SignInForm />
            <ToastContainer
              position="top-right"
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <span></span>
          </>
        ) : (
          <MDBCard>
            <MDBCardBody>
              <form action="" onSubmit={handleRegister} id="sign-up-form">
                <p className="text-center py-4">Enregistrement locataire</p>
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
                    htmlFor="tel"
                    label="Téléphone (préciser l'indicatif du pays)"
                    icon="phone"
                    type="number"
                    name="tel"
                    id="tel"
                    onChange={(e) => setTel(e.target.value)}
                    value={tel}
                  />
                  <div className="tel error"></div>
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
                  <p>
                    <label>
                      <input type="checkbox" id="terms" checked />
                      <span>
                        {"  "} En créant un compte, vous acceptez nos{" "}
                        <a
                          href="/conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          conditions générales
                        </a>
                      </span>
                    </label>
                  </p>
                  <div className="terms error"></div>
                </div>
                <div className="font-weight-light">
                  <Recaptcha
                    required
                    sitekey="6Le2EYkaAAAAADc5n5rxwdOfQ9NnAEFIbwQJEajb"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={recaptchaLoaded}
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  {verify ? (
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                    >
                      Valider inscription
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        )}
      </Suspense>
    </>
  );
};

export default SignUpForm;
