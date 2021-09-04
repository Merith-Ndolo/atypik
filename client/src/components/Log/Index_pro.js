import React, { lazy, Suspense, useState } from "react";

const SignUpProForm = lazy(() => import("./SignUpProForm"));
const SignInProForm = lazy(() => import("./SignInProForm"));

const Index_pro = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const renderLoader = () => <p>Loading</p>;

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <br />
      <Suspense fallback={renderLoader()}>
        <div
          style={{ color: "#17233e", fontWeight: "bold", cursor: "pointer" }}
          onClick={handleModals}
          id="register"
          className={signUpModal ? "active-btn" : null}
        >
          <i class="fas fa-arrow-right" style={{ color: "#f39200" }}></i>Nouveau
          propriétaire ?
        </div>
        <br />
        <div
          style={{ color: "#17233e", fontWeight: "bold", cursor: "pointer" }}
          onClick={handleModals}
          id="login"
          className={signInModal ? "active-btn" : null}
        >
          <i class="fas fa-arrow-right" style={{ color: "#f39200" }}></i>Déjà
          propriétaire ?
        </div>

        {signUpModal && <SignUpProForm />}
        {signInModal && <SignInProForm />}
      </Suspense>
    </div>
  );
};

export default Index_pro;
