const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  accessKeyId: process.env.MY_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_APP_AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "software-project",
    key: function (req, file, cb) {
      const extension = file.originalname.split(".").pop();
      const filename = `${uuidv4()}.${extension}`;
      cb(null, filename);
    },
  }),
});

module.exports = {upload};