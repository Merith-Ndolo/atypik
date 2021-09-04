import React, { useState } from "react";
import Thread from "../components/Thread";
import SearchForm from "../components/Post/SearchForm";
import NavBarPro from "../components/PageAccueil/NavBarPro";
import DropdownPro from "../components/PageAccueil/DropdownPro";
import LeftNav from "../components/LeftNav";

const HomePro = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <NavBarPro toggle={toggle}/>
    <DropdownPro isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}}>
      <div className="row">
        <div className="col-1" style={{ float: 'right'}}>
          <LeftNav />
        </div>
        <div className="col-11">
          <br/>
          <SearchForm/>
          <hr/>
          <Thread />
        </div>
        <div className="">
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePro;
