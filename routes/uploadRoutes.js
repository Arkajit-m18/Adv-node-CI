const AWS = require("aws-sdk");
const uuid = require("uuid/v1");

const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");

AWS.config = new AWS.Config({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: "us-east-1",
});

const s3 = new AWS.S3();

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "adv-node-blog-bucket",
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });
};
