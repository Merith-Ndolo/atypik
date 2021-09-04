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
import { NavLink } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const roleError = document.querySelector(".role.error");
    const validationError = document.querySelector(".validation.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
          roleError.innerHTML = res.data.errors.role;
          validationError.innerHTML = res.data.errors.validation;
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <form action="" onSubmit={handleLogin} id="sign-up-form">
            <p className="text-center py-4">Connexion locataire</p>
            <div className="grey-text">
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
              <div className="role error"></div>
              <div className="validation error"></div>
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
            </div>
            <button className="btn waves-effect waves-light" type="submit">
              Se connecter
            </button>
            <div className="text-right py-4 mt-3">
              <NavLink to="/forgot">Mot de passe oublié</NavLink>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default SignInForm;
