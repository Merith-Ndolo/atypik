import React, { lazy, Suspense } from "react";

const SignInAdminForm = lazy(() => import("./SignInAdminForm"));

const Index_admin = () => {
  const renderLoader = () => <p>Loading</p>;

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <br />
      <Suspense fallback={renderLoader()}>
        <SignInAdminForm />
      </Suspense>
    </div>
  );
};

export default Index_admin;
