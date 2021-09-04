import React, { useState, lazy, Suspense } from "react";
import "../style/index.css";
import { MdViewList } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Thread = lazy(() => import("../components/Thread"));
const Trends = lazy(() => import("../components/Trends"));
const SearchForm = lazy(() => import("../components/Post/SearchForm"));
const NavBar = lazy(() => import("../components/PageAccueil/NavBar"));
const Dropdown = lazy(() => import("../components/PageAccueil/Dropdown"));

const Home = () => {
  const renderLoader = () => <p>Loading</p>;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Suspense fallback={renderLoader()}>
        <NavBar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <div className="container" style={{ paddingTop: "60px" }}>
          <h1
            style={{
              fontSize: "25",
              paddingTop: "20px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Annonces pour les locations atypiques disponibles{" "}
          </h1>
          <div
            className="show-link"
            style={{
              textAlign: "center",
              color: "#17233e",
            }}
          >
            TENDANCES <br />
            <NavLink to="bestof" style={{ color: "#f39200" }}>
              <MdViewList />
            </NavLink>
          </div>
          <SearchForm />
          <div className="hide-trends">
            <div className="row">
              <div className="col-8">
                <Thread />
              </div>
              <div className="col-4">
                <Trends />
              </div>
            </div>
          </div>
          <div className="show-link">
            <Thread />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
