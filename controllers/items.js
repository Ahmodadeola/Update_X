const Item = require("../model/items");
const { cloudinaryConfig, uploader } = require("../config/cloudinaryConfig");

cloudinaryConfig();

exports.addItemController = (req, res) => {
  let data = JSON.parse(req.body.details);
  if (req.file) {
    uploader
      .upload(req.file.path)
      .then((result) => {
        let item = new Item({
          ...data,
          img: result.secure_url,
          date: new Date(),
        });
        item
          .save()
          .then((data) => res.json(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => res.json(err));
  } else {
    let item = new Item({ ...data, date: new Date() });
    console.log(item);
    item
      .save()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
};

exports.getItemsController = (req, res) => {
  Item.find().then((data) => res.json({ dataCount: data.length, data: data }));
};

exports.updateItemController = (req, res) => {
  Item.findById(req.body.id)
    .then((item) => {
      Object.keys(req.body.props).forEach((key) => {
        item[key] = req.body.props[key];
      });
      item.save().then((item) => {
        console.log(item);
        res.json(item);
      });
    })
    .catch((err) => console.log(err));
};
