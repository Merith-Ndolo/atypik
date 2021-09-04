require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: "atypikhouse-app-bucket",
    Body: fileStream,
    Key: file.originalName,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

//dowloads a file from s3
function getFilesStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: "atypikhouse-app-bucket",
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFilesStream = getFilesStream;
