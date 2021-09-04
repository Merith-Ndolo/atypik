const SectionModel = require("../models/section_model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utilitaires/errors_utils");
const { uploadFile } = require("../s3");
require("dotenv").config({ path: "./config/.env" });

module.exports.uploadSection = async (req, res) => {
  let s3Key;

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

  try {
    await SectionModel.findByIdAndUpdate(
      req.body.paramId,
      {
        $set: {
          picture:
            req.file !== null ? process.env.API_URL + "images/" + s3Key : "",
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
