const Category = require("../model/category");

exports.addCategoryController = (req, res) => {
  let category = new Category(JSON.parse(req.body.details));
  category
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};

exports.getCategoriesController = (req, res) => {
  Category.find()
    .then((data) => res.json({ dataCount: data.length, data }))
    .catch((err) => res.send(err));
};
