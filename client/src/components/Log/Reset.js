import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { useParams } from "react-router-dom";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const { id } = useParams();
  //console.log(id);

  const notifySuccess = () => {
    toast.success("Votre mot de passe a été réinitialisé!", {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
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
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/reset/${id}`,
        withCredentials: true,
        data: {
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = "/profil";
            notifySuccess();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <form action="" onSubmit={handleLogin} id="sign-up-form">
                <p className="h4 text-center py-4">Mot de passe oublié</p>
                <div className="grey-text">
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
                </div>
                <div className="text-center py-4 mt-3">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Reinitialiser mon mot de passe
                  </button>
                </div>
              </form>
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
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Reset;
