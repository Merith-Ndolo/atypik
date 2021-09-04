import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./UserIdConnect";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/index.css"
import Logout from './Log/Logout';

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  const afficheAnnonce = () =>
  {
    if (userData.role !== 'client') {
      return (
        <NavLink to="/newpost">
          <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
            annonce+
          </button>
      </NavLink>
      )
    }
  }

  const afficheMesOffres = () =>
  {
    if (userData.role !== 'client') {
      return (
        <NavLink exact to="/post_pro">
          <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
            Mes Offres
          </button>
        </NavLink>
      )
    }
  }

  const afficheMesResevations = () =>
  {
    if (userData.role === 'client') {
      return (
        <NavLink to="/mes_reservations">
          <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
            Mes reservations
          </button>
      </NavLink>
      )
    }
  }

  return (

    <nav style={{ backgroundColor: '#ff9f1a' }}>
      <div className="container">
        <div className="navbar">
          <NavLink exact to="/accueil">
            <h3 style={{ color: 'white', fontFamily: 'fantasy' }}>AtypikHouse</h3>
          </NavLink>
          
          {uid ? (
            <>
              <div>
                  {afficheAnnonce()}
                  {afficheMesResevations()}
              </div>
              <div>
                {afficheMesOffres()}
              </div>
              
              <NavLink exact to="/message">
                <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
                  Message
                </button>
              </NavLink>
              <NavLink exact to="/profil">
              <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
                  Profil  <img height="35" style={{ borderRadius: "60%", align: "center" }} src={userData.picture} alt="user-pic" />
                </button>
               
              </NavLink>
               <h6> {userData.pseudo}</h6>
               <NavLink to=''>
                <div style={{textAlign:'right'}}>
                  <Logout/>
                </div>
                
              </NavLink>
            </>
          ) : (
              <div>
                <NavLink to="/profil">
            <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
              Client
              <img src="../img/icons/logout.svg" alt="img" />
            </button>
          </NavLink>
          {" "}
          <NavLink to="/profil_pro">
            <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
            propriétaire
            <img src="../img/icons/logout.svg" alt="img" />
            </button>
          </NavLink>
          {" "}
          <NavLink to="/profil_admin">
            <button style={{color:'#ff9f1a'}}  className="btn-large btn-light">
              Administrateur
              <img src="../img/icons/logout.svg" alt="img" />
            </button>
          </NavLink>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
