const { config, uploader } = require("cloudinary").v2;

const cloudinaryConfig = () =>
  config({
    cloud_name: "adeola1735",
    api_key: "816961839298775",
    api_secret: "dhFPLutSqYbAPHbIL_K8TahluZ0",
  });

module.exports = { cloudinaryConfig, uploader };
