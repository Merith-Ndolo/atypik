const ParamModel = require("../models/param_model");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utilitaires/errors_utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadFile } = require("../s3");
require("dotenv").config({ path: "./config/.env" });

module.exports.createSlide = async (req, res) => {
  let s3Key;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 1000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }

    const myFile = req.file;
    const result = await uploadFile(myFile);
    s3Key = result.Key;
    console.log(result);
  }

  const newParam = ParamModel({
    paramId: req.body.paramId,
    titre: req.body.titre,
    prix: req.body.prix,
    temps: req.body.temps,
    picture: req.file !== null ? process.env.API_URL + "images/" + s3Key : "",
  });
  try {
    const param = await newParam.save();
    return res.status(201).json(param);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.readParam = (req, res) => {
  ParamModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.updateParam = (req, res) => {
  const updateRecord = {
    titre: req.body.titre,
    prix: req.body.prix,
    temps: req.body.temps,
  };

  ParamModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deleteParam = (req, res) => {
  ParamModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};
