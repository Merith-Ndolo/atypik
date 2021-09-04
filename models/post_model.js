const mongoose = require("mongoose");

const post_schema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    titre: {
      type: String,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: [String],
    },
    video: {
      type: String,
    },
    prix: {
      type: Number,
    },
    superficie: {
      type: Number,
    },
    departement: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    lng: {
      type: Number,
    },
    lat: {
      type: Number,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    clientId: {
      type: String,
    },
    nbr_personne: {
      type: Number,
    },
    likers: {
      type: [String],
      required: true,
    },
    date_open: {
      type: Date,
    },
    date_close: {
      type: Date,
    },
    reservations: {
      type: [
        {
          reservationId: String,
          personPseudo: String,
          paiement: Number,
          date_open: Date,
          date_close: Date,
          timestamp: Number,
        },
      ],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
    prises: {
      type: [
        {
          priseId: String,
          prisePseudo: String,
          prisePicture: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", post_schema);
