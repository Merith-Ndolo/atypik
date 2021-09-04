import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty, shortDateParser } from "../Utilitaires";
import LikeButton from "./LikeButton";
import {
  deleteReserve,
  sendEmail,
  updatePost,
  updateStatus,
} from "../../actions/postAction";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBCard } from "mdbreact";
import Popup from "reactjs-popup";
import { useContext } from "react";
import { UidContext } from "../UserIdConnect";
import CardPrises from "./CardPrises";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  MailruShareButton,
  MailruIcon,
  EmailShareButton,
  EmailIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";
import CardaddPic from "./CardaddPic";
import MsgData from "../../data/MsgData";

import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";

const NavLink = css`
  color: #3a3a3a;
  display: flex;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    color: #cd853f;
    font-weight: bold;
  }
`;

const CardLink = styled(Link)`
  ${NavLink}
`;

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const showModalB = () => {
    setIsOpenB(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const hideModalB = () => {
    setIsOpenB(false);
  };

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate, userData.role));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const valideReservation = () => {
    dispatch(
      updateStatus(
        post._id,
        post.message,
        "reservé",
        post.clientId,
        userData.role
      )
    );
    {
      !isEmpty(usersData[0]) &&
        usersData.map((user) => {
          if (user._id === post.clientId) {
            dispatch(
              sendEmail(
                user.email,
                user.pseudo,
                MsgData[3].subject,
                MsgData[3].text
              )
            );
          }
        });
    }
  };

  const refuseReservation = () => {
    dispatch(
      updateStatus(
        post._id,
        post.message,
        "refusé",
        post.clientId,
        userData.role
      )
    );
    {
      !isEmpty(usersData[0]) &&
        usersData.map((user) => {
          if (user._id === post.clientId) {
            dispatch(
              sendEmail(
                user.email,
                user.pseudo,
                MsgData[4].subject,
                MsgData[4].text
              )
            );
          }
        });
    }
    post.reservations.map((reservation) => {
      dispatch(deleteReserve(post._id, reservation._id));
    });
    window.location.reload(false);
  };

  const soumission = () => {
    dispatch(
      updateStatus(post._id, post.message, "validation", null, userData.role)
    );
  };

  const annuleReservation = () => {
    dispatch(
      updateStatus(post._id, post.message, "non_reservé", userData.role)
    );
    {
      !isEmpty(usersData[0]) &&
        usersData.map((user) => {
          if (post.posterId === user._id) {
            dispatch(
              sendEmail(
                user.email,
                user.pseudo,
                MsgData[5].subject,
                MsgData[5].text
              )
            );
          }
        });
    }
    post.reservations.map((reservation) => {
      return dispatch(deleteReserve(post._id, reservation._id));
    });
  };

  const status = () => {
    if (post.status === "reservé") {
      return (
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#2ed573",
            borderRadius: "4px 8px",
          }}
        >
          Réservé
        </span>
      );
    } else if (post.status === "attente") {
      return (
        <div>
          <span
            style={{
              fontSize: "12px",
              backgroundColor: "#25fde9",
              borderRadius: "4px 8px",
            }}
          >
            En attente
          </span>
          <form action="" onClick={valideReservation}>
            <button type="submit">Valider</button>
          </form>{" "}
          <form action="" onClick={refuseReservation}>
            <button type="button">Refuser</button>
          </form>
        </div>
      );
    } else if (post.status === "annulé") {
      return (
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#ff9f1a",
            borderRadius: "4px 8px",
          }}
        >
          Annulé
        </span>
      );
    } else if (post.status === "non_reservé") {
      return (
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#ff9f1a",
            borderRadius: "4px 8px",
          }}
        >
          Non reservé
        </span>
      );
    } else if (post.status === "refusé") {
      return (
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#ff9f1a",
            borderRadius: "4px 8px",
          }}
        >
          Non reservé
        </span>
      );
    } else if (post.status === "ajout_images" && post.picture.length < 5) {
      return (
        <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
          {" "}
          Vous avez {post.picture.length} image
          {post.picture.length < 2 ? "" : "s"}
        </span>
      );
    } else if (post.status === "ajout_images" && post.picture.length >= 5) {
      return (
        <form action="" onClick={soumission}>
          <button type="submit">Soumettre</button>
        </form>
      );
    }
  };

  const afficheReservButton = () => {
    if (
      (userData.role !== "propriétaire" && post.status === "non_reservé") ||
      (userData.role !== "propriétaire" && post.status === "refusé")
    ) {
      return (
        <CardLink
          exact
          to={{
            pathname: "/reservation",
            search: `id=${post._id}`,
          }}
        >
          <img
            id="reserve"
            width="25px"
            src="./img/calendar.png"
            alt="reserve"
            data-toggle="modal"
            data-target="#exampleModal"
            quality="60"
            format="webp"
            loading="lazy"
          />
        </CardLink>
      );
    } else if (
      userData.role !== "propriétaire" &&
      post.clientId === userData._id &&
      post.status === "attente"
    ) {
      return (
        <div>
          <span style={{ fontSize: "12px" }}>
            status :{" "}
            <span
              style={{ backgroundColor: "#25fde9", borderRadius: "4px 8px" }}
            >
              En attente de validation
            </span>
          </span>
          <br />
          <form
            action=""
            onClick={() => {
              if (
                window.confirm(
                  "Voulez-vous annuler votre demande de reservation ?"
                )
              ) {
                annuleReservation();
              }
            }}
          >
            <button type="submit" titre="Annuler la reservation">
              Annuler
            </button>
          </form>
        </div>
      );
    } else if (
      userData.role !== "propriétaire" &&
      post.clientId !== null &&
      post.status === "reservé"
    ) {
      return (
        <div>
          <span style={{ fontSize: "12px" }}>
            status :{" "}
            <span
              style={{ backgroundColor: "#2ed573", borderRadius: "4px 8px" }}
            >
              Reservé &#128521;
            </span>
          </span>
        </div>
      );
    } else if (
      userData.role !== "propriétaire" &&
      post.clientId !== null &&
      post.status === "refusé"
    ) {
      return (
        <div>
          <span style={{ fontSize: "12px" }}>
            status :{" "}
            <span
              style={{ backgroundColor: "#ff4757", borderRadius: "4px 8px" }}
            >
              Refus
            </span>
          </span>
        </div>
      );
    } else if (
      userData.role !== "propriétaire" &&
      post.clientId !== null &&
      post.status === "annulé"
    ) {
      return (
        <div>
          <span style={{ fontSize: "12px" }}>
            status :{" "}
            <span
              style={{ backgroundColor: "#ff4757", borderRadius: "4px 8px" }}
            >
              Votre reservation a été annulée
            </span>
          </span>
        </div>
      );
    } else if (userData.role === "propriétaire") {
      return (
        <div>
          <span style={{ fontSize: "12px" }}>status : {status()}</span>
        </div>
      );
    }
  };

  const ajoutImg = () => {
    return (
      <div>
        <div
          onClick={showModalB}
          style={{ cursor: "pointer" }}
          title="Voir toutes les images"
        >
          <i className="fas fa-image"></i>
        </div>
        <Modal show={isOpenB} onHide={hideModalB}>
          <Modal.Header>
            <Modal.Title>Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <CardaddPic post={post} key={post._id} />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn waves-effect waves-light"
              onClick={hideModalB}
            >
              Fermer
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const dateReservation = () => {
    {
      !isEmpty(post.reservations[0]) &&
        post.reservations.map((reservation) => {
          return <h1>{shortDateParser(reservation.date_open)}</h1>;
        });
    }
  };

  const ficheLocataire = () => {
    if (post.clientId !== null && userData.role === "propriétaire") {
      return (
        <Popup
          trigger={<i class="fas fa-address-card" title="fiche locataire"></i>}
          position={["bottom right"]}
          closeOnDocumentClick
        >
          <div>
            {!isEmpty(usersData[0]) &&
              usersData.map((user) => {
                if (user._id === post.clientId) {
                  return (
                    <div>
                      <p>
                        Pseudo : {user.pseudo}
                        {post.status === "reservé" && (
                          <img
                            src="./img/check.png"
                            alt="check"
                            quality="60"
                            format="webp"
                            loading="lazy"
                          />
                        )}
                        {post.status === "refusé" && (
                          <img
                            src="./img/close.png"
                            alt="close"
                            quality="60"
                            format="webp"
                            loading="lazy"
                          />
                        )}
                        {post.status === "attente" && (
                          <img
                            src="./img/Spinner.svg"
                            alt="spinner"
                            quality="60"
                            format="webp"
                            loading="lazy"
                          />
                        )}
                        <br />
                        {user.email} <br />
                        Tel : {user.tel}
                      </p>
                    </div>
                  );
                }
              })}
          </div>
        </Popup>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <MDBCard style={{ backgroundColor: "#f5f6fa" }}>
        <li className="container" key={post._id}>
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <div>
              <div className="round">
                <h2 style={{ paddingTop: "3px", fontSize: "15px" }}>
                  <div className="row">
                    <div className="col-6">
                      <img
                        rel="preload"
                        as="image"
                        href="img.png"
                        height="40"
                        width="40"
                        quality="60"
                        format="webp"
                        loading="lazy"
                        style={{ borderRadius: "50%" }}
                        src={
                          !isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId)
                                return user.picture;
                              else return null;
                            })
                            .join("")
                        }
                        alt="poster-pic"
                      />
                      {"  "}
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user._id === post.posterId) return user.pseudo;
                            else return null;
                          })
                          .join("")}
                    </div>
                    <div className="col-6">
                      <div className="col-sm" style={{ textAlign: "right" }}>
                        <img
                          onClick={showModal}
                          style={{ cursor: "pointer" }}
                          src="./img/camera.png"
                          title="Prise de vue locataire"
                          alt="camera"
                          quality="60"
                          format="webp"
                          loading="lazy"
                        />
                        <Modal show={isOpen} onHide={hideModal}>
                          <Modal.Header>
                            <Modal.Title>
                              Prise de vue et activités à proximité
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CardPrises post={post} key={post._id} />
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn waves-effect waves-light"
                              onClick={hideModal}
                            >
                              Fermer
                            </button>
                          </Modal.Footer>
                        </Modal>
                        <br />
                        {ficheLocataire()}
                      </div>
                    </div>
                  </div>
                </h2>
              </div>
              <div>
                <span class="card-title activator grey-text text-darken-4">
                  {post.titre}
                </span>
                <div className="row">
                  <div className="col-sm">
                    <div>
                      {post.picture[0] !== "" && (
                        <img
                          height="200"
                          style={{ borderRadius: "10px" }}
                          width="100%"
                          src={post.picture[0]}
                          alt="card-pic"
                          className="lazyload"
                          className=""
                          quality="60"
                          format="webp"
                          loading="lazy"
                        />
                      )}
                      {post.video && (
                        <iframe
                          width="100%"
                          height="200"
                          style={{ borderRadius: "10px", paddingTop: "5px" }}
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                    </div>

                    {isUpdated && (
                      <div className="update-post">
                        <textarea
                          defaultValue={post.message}
                          onChange={(e) => setTextUpdate(e.target.value)}
                        />
                        <div className="button-container">
                          <button className="btn" onClick={updateItem}>
                            Valider modification
                          </button>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        position: "relative",
                        bottom: "22px",
                        right: "0px",
                        display: "flex",
                        zIndex: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        width: "25px",
                        borderRadius: "50px",
                        fontWeight: "bolder",
                        paddingLeft: "8px",
                      }}
                    >
                      {post.picture.length}
                    </div>
                  </div>
                  <div className="col-sm">
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                      {dateParser(post.createdAt)}
                    </span>
                    {isUpdated === false && (
                      <p
                        style={{ fontSize: "15px" }}
                        class="card-title activator grey-text text-darken-1"
                      >
                        {post.message}
                      </p>
                    )}
                    <span
                      style={{ fontSize: "15px" }}
                      class="card-title activator grey-text text-darken-1"
                    >
                      {post.type}
                      <br />
                      {post.prix} € la nuité
                      <br />
                      {post.nbr_personne} personne
                      {post.nbr_personne > 1 ? "s" : ""}
                      <br />
                      {post.departement}
                      <br />
                    </span>
                    Disponible du {shortDateParser(post.date_open)} au{" "}
                    {shortDateParser(post.date_close)}
                    <br />
                    <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
                      {" "}
                      {post.reservations
                        ? post.reservations.map((reserve) => {
                            return (
                              <div>
                                <span>
                                  Reservation du{" "}
                                  {shortDateParser(reserve.date_open)} au{" "}
                                  {shortDateParser(reserve.date_close)}
                                </span>
                              </div>
                            );
                          })
                        : null}
                    </span>
                    {dateReservation()}
                  </div>
                </div>
                {userData._id === post.posterId && (
                  <div className="container">
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <i className="fas fa-edit"></i>
                    </div>
                    <DeleteCard id={post._id} />
                  </div>
                )}
                <div className="row">
                  <div className="col-3">
                    <span style={{ fontSize: "12px" }}></span>
                    <i
                      onClick={() => setShowComments(!showComments)}
                      className="fas fa-comment"
                    ></i>{" "}
                    {post.comments.length}
                  </div>
                  <div className="col-2">
                    <LikeButton post={post} />
                  </div>
                  <div className="col-3">{afficheReservButton()}</div>
                  <div className="col-2"> {ajoutImg()}</div>
                  <div className="col-1">
                    <Popup
                      trigger={
                        <img
                          width="15px"
                          title="Partager"
                          src="./img/share.png"
                          alt="share"
                          quality="60"
                          format="webp"
                          loading="lazy"
                        />
                      }
                      position={["top left"]}
                      size={["Nano - 10%"]}
                      closeOnDocumentClick
                    >
                      <FacebookShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <FacebookIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></FacebookIcon>
                      </FacebookShareButton>{" "}
                      <WhatsappShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <WhatsappIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></WhatsappIcon>
                      </WhatsappShareButton>{" "}
                      <TwitterShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <TwitterIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></TwitterIcon>
                      </TwitterShareButton>{" "}
                      <LinkedinShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <LinkedinIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></LinkedinIcon>
                      </LinkedinShareButton>{" "}
                      <MailruShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <MailruIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></MailruIcon>
                      </MailruShareButton>{" "}
                      <EmailShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <EmailIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></EmailIcon>
                      </EmailShareButton>{" "}
                      <InstapaperShareButton
                        url={`${process.env.REACT_APP_API_URL}reservation?id=${post._id}`}
                        quote={"Hey !!!!"}
                        hashtag="#atyipkhouseG4"
                      >
                        <InstapaperIcon
                          size="20px"
                          logoFillColor="white"
                          round={true}
                        ></InstapaperIcon>
                      </InstapaperShareButton>
                    </Popup>
                  </div>
                </div>
                {showComments && <CardComments post={post} />}
              </div>
            </div>
          )}
        </li>
      </MDBCard>
    </div>
  );
};

export default Card;
