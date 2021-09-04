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
import { useSelector } from "react-redux";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const notifySuccess = () => {
    toast("Un mail de réinitialisation vous a été envoyé!", {
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
    const emailError = document.querySelector(".email.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/forgot`,
      withCredentials: true,
      data: {
        email,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
        } else {
          window.location = "/profil";
          notifySuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                    label="email"
                    icon="envelope"
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div className="email error"></div>
                </div>
                <div className="text-center py-4 mt-3">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Reinitialiser
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

export default Forgot;
