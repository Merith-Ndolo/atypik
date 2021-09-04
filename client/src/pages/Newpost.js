import React, {useState} from "react";
import NewPostForm from "../components/Post/NewPostForm";
import NavBarPro from "../components/PageAccueil/NavBarPro";
import DropdownPro from "../components/PageAccueil/DropdownPro";


const Newpost = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <NavBarPro toggle={toggle}/>
    <DropdownPro isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}}>
            <NewPostForm />  
    </div>
    </>
  );
};

export default Newpost;
