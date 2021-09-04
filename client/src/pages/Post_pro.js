import React, { useState } from "react";
import ThreadsPro from "../components/ThreadsPro";
import NavBarPro from "../components/PageAccueil/NavBarPro";
import DropdownPro from "../components/PageAccueil/DropdownPro";

const Post_pro = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBarPro toggle={toggle} />
      <DropdownPro isOpen={isOpen} toggle={toggle} />
      <div className="container" style={{ paddingTop: "60px" }}>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <br />
            <h2>Mes posts</h2>
            <ThreadsPro />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default Post_pro;
