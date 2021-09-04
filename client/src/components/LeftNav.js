import React from 'react';

const LeftNav = () => {


  return (
    <div className="left-nav-container">
      <div className="container">
        <div className="container">
          <a href='https://www.facebook.com/AtypikHouse-G4-111309504389945' target="_blank" rel="noreferrer">
            <img className="img_dec" src="./img/logo/facebook.png" alt="facebook"/>
          </a>
          <br/>
          <a href="https://www.instagram.com/atypikhouse.g4/" target="_blank" rel="noreferrer">
            <img className="img_dec" src="./img/logo/instagram.png" alt="instagram"/>
          </a>
          <br/>
          <a href="https://twitter.com/AtypikhouseG" target="_blank" rel="noreferrer">
            <img className="img_dec" src="./img/logo/twitter.png" alt="twitter"/>
          </a>
          <br/>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img className="img_dec" src="./img/logo/linkedin.png" alt="linkedin"/>
          </a>
          
         
          
        </div>
      </div>
    </div>
  );
};

export default LeftNav;