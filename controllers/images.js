const path = require("path");
const fs = require("fs");
const Item = require("../model/items");
const { cloudinaryConfig, uploader } = require("../config/cloudinaryConfig");

cloudinaryConfig();

const getFullImageName = (name) => {
  const imagePath = path.join(__dirname, "images");
  return new Promise((resolve, reject) => {
    let imageNames = [],
      img;
    fs.readdir(imagePath, (err, files) => {
      if (err) reject("dir reading failed");
      files.forEach((file) => imageNames.push(file));
      img = imageNames.find((image) => image.substr(14) === name);
      resolve(img);
    });
  });
};

exports.imageUpdateController = (req, res) => {
  let id = req.body.id;
  console.log(req.file, "In here");
  uploader
    .upload(req.file.path)
    .then((result) => {
      console.log(result);
      Item.findById(id)
        .then((item) => {
          item.img = result.secure_url;
          item.save().then((item) => res.json(item));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.json(err));
};

exports.getImageController = (req, res) => {
  getFullImageName(req.params.imgId).then(
    (name) => {
      if (req.params.imgId === "image.jpg")
        res.sendFile(path.join(__dirname, "images/image.jpg"));
      let actualPath = path.join(__dirname, "images/" + name);

      res.sendFile(actualPath);
    },
    (err) => console.log("Something went wrong")
  );
};
