import React, { useState } from "react";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import SearchForm from "../../components/Post/SearchForm";
import ThreadAdmin from "../../components/ThreadAdmin";

const Gestion_pubs = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <div>
      <NavBarAdmin toggle={toggle} />
      <DropdownAdmin isOpen={isOpenNav} toggle={toggle} />
      <div className="container">
        <div className="col-12" style={{ paddingTop: "100px" }}>
          <h1>Gestion des publications</h1>
          <div className="container">
            <SearchForm />
            <ThreadAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gestion_pubs;
