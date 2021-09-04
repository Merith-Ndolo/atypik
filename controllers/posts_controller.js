const PostModel = require("../models/post_model");
const postModel = require("../models/post_model");
const UserModel = require("../models/user_model");
const { uploadErrors } = require("../utilitaires/errors_utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
require("dotenv").config({ path: "./config/.env" });
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const { uploadFile, getFilesStream } = require("../s3");

//mail
module.exports.sendMailTo = async (req, res) => {
  let { email, pseudoPro, subject, text } = req.body;

  const oauth2Client = new OAuth2(
    "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
    "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
  });
  const accessToken = oauth2Client.getAccessToken();

  const output = `<div className="email">
  <p>Bonjour ${pseudoPro}, <br/><br/>${text}</p>
</div>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "nodejsa@gmail.com",
      clientId:
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
      clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
      refreshToken:
        "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: '"Atypikhouse G4" <nodejsa@gmail.com>',
    to: `${email}`,
    subject: `${subject}`,
    html: output,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail sent : %s", info.response);
    }
  });
};

//Justificatif
module.exports.sendJustificatif = async (req, res) => {
  let { email, pseudo, prix, titre } = req.body;

  console.log("yes mail");

  const oauth2Client = new OAuth2(
    "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
    "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
  });
  const accessToken = oauth2Client.getAccessToken();

  const output = `<div className="email">
        <p>Bonjour ${pseudo}, <br/><br/>suite à votre demande réservation pour le bien : ${titre}, nous vous envoyons le justificatif du versement de la somme de ${prix} €</p>
        <p>Pour des raison de sécurité, votre argent sera transféré au propréitaire si votre de demande est validé.</p>
        <p> En cas de réfus ou d'annulation, cette somme vous sera remboursée dans un delais de 5 jours<p>
        <p> Bien cordialement <p>
      </div>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "nodejsa@gmail.com",
      clientId:
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
      clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
      refreshToken:
        "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: '"Atypikhouse G4" <nodejsa@gmail.com>',
    to: `${email}`,
    subject: "Justificatif de votre paiement ✔",
    html: output,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail sent : %s", info.response);
    }
  });
};

//Lecture des Posts (publications)
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//Lecture d'une publication
module.exports.readOnePost = (req, res) => {
  let type = req.query.type;
  let postIds = req.query.id;

  if (type === "array ") {
  }

  // Post correspondant à chaque un id (posterId)
  PostModel.find({ _id: { $in: postIds } })
    .populate("writer")
    .exex((err, post) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(post);
    });
};

//Nouveau POST
module.exports.createPost = async (req, res) => {
  let fileName;
  let s3Key;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }

    const myFile = req.file;
    const result = await uploadFile(myFile);
    s3Key = result.Key;
    console.log(result);
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    titre: req.body.titre,
    prix: req.body.prix,
    superficie: req.body.superficie,
    departement: req.body.departement,
    lng: req.body.lng,
    lat: req.body.lat,
    type: req.body.type,
    status: req.body.status,
    clientId: req.body.clientId,
    nbr_personne: req.body.nbr_personne,
    picture: req.file !== null ? process.env.API_URL + "images/" + s3Key : "",
    video: req.body.video,
    likers: [],
    date_open: req.body.date_open,
    date_close: req.body.date_close,
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Mise à Jour Message post
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    status: req.body.status,
    clientId: req.body.clientId,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

// Suppression du Post
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

//LAISSER UN COMMENTAIRE
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Faire une reservation
module.exports.makeReservation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reservations: {
            reservationId: req.body.reservationId,
            personPseudo: req.body.personPseudo,
            paiement: req.body.paiement,
            date_open: req.body.date_open,
            date_close: req.body.date_close,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//PAIEMENT
module.exports.editReservation = (req, res) => {
  console.log("yes reservation");
  console.log(req.body.paiement);
  console.log(req.body.reservationId);

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theReservation = docs.reservations.find((reservation) =>
        reservation._id.equals(req.body.reservationId)
      );

      if (!theReservation) return res.status(404).send("Reservation not found");
      theReservation.paiement = req.body.paiement;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//SUPPRIMER UN RSERVATION
module.exports.deleteReservation = async (req, res) => {
  let { email, pseudo, titre } = req.body;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reservations: {
            _id: req.body.reservationId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else res.status(400).send(err);
      }
    );

    const oauth2Client = new OAuth2(
      "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
      "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
    });

    const accessToken = oauth2Client.getAccessToken();

    const output = `<div className="email">
          <p>Bonjour ${pseudo}, <br/><br/>Votre demande d'annulation pour le bien " ${titre}"  a bien été prise en compte.</p>
          <p> si vous avez déjà effectué le paiment, cette somme vous sera remboursée dans un delais de 5 jours<p>
          <p> Bien cordialement <p>
        </div>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nodejsa@gmail.com",
        clientId:
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
        clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
        refreshToken:
          "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '"Atypikhouse G4" <nodejsa@gmail.com>',
      to: `${email}`,
      subject: "Annulation validée ✔",
      html: output,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail sent : %s", info.response);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Ajouter des images
module.exports.addPicture = async (req, res) => {
  let s3Key;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }

    const myFile = req.file;
    const result = await uploadFile(myFile);
    s3Key = result.Key;
    console.log(result);
  }

  return new Promise(function (resolve, reject) {
    PostModel.findById(req.params.id, function (err, item) {
      if (err) {
        reject(err);
      } else {
        item.picture.push(process.env.API_URL + "images/" + s3Key);
        item
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

//LAISSER UNE PRISE DE VUE
module.exports.prisePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  let s3Key;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }

    const myFile = req.file;
    const result = await uploadFile(myFile);
    s3Key = result.Key;
    console.log(result);
  }

  return new Promise(function (resolve, reject) {
    PostModel.findById(req.params.id, function (err, item) {
      if (err) {
        reject(err);
      } else {
        item.prises.push({
          priseId: req.body.priseId,
          prisePseudo: req.body.prisePseudo,
          prisePicture:
            req.file !== null ? process.env.API_URL + "images/" + s3Key : "",
          text: req.body.text,
          timestamp: new Date().getTime(),
        });
        item
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    }).catch((err) => {
      reject(err);
    });
  });

  /*try {
    return PostModel.findOneAndUpdate(
      req.params.id,
      {
        $push: {
          prises: {
            priseId: req.body.priseId,
            prisePseudo: req.body.prisePseudo,
            prisePicture:
              req.file !== null ? process.env.API_URL + "images/" + s3Key : "",
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }*/
};

//MODIFIER UN COMMENTAIRE
module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//SUPPRIMER UN COMMENTAIRE
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Aimer et Ajouter un Post à ses Favoris
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Ne plus aimer un post ou supprimer un post de ses favoris
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
