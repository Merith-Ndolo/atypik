import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './UserIdConnect';
import Logout from './Log/Logout';

const LeftNavAdmin = () => {
  const uid = useContext(UidContext);

  return (
    <div className="left-nav-container">
      <div className="container">
        <div className="container">
          <br/>
          { uid ? (
            <>
              <NavLink to='/gestion' exact >
                  PRESENTATION
              </NavLink>
              <br/>
              <br/>
              <NavLink to='/gestion_pro' exact >
                  PROPRIETAIRES
              </NavLink>
              <br/>
              <br/>
              <NavLink to='/parametres' exact >
                  PARAMETRES
              </NavLink>
              <br/>
              <br/>
              <NavLink to='/pub_attente' exact >
                  VALIDATION
              </NavLink>
              <br/>
              <br/>
              <NavLink to='/gestion_pubs' exact >
                  HABITATS
              </NavLink>
             <br/>
             <br/>
              <NavLink to='/gestion_clients' exact >
                  CLIENTS
              </NavLink>
              <br/>
              <br/>
                <NavLink to=''>
                <Logout/>
              </NavLink>
              
            </>
          ) : (
            ""
          )}
          
          
        </div>
      </div>
    </div>
  );
};

export default LeftNavAdmin;