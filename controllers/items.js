const Item = require("../model/items");
const Transaction = require("../model/transaction");
const { cloudinaryConfig, uploader } = require("../config/cloudinaryConfig");

cloudinaryConfig();

const isQuantitySame = (q1, q2) => {
  let result = true;
  Object.keys(q1).forEach((key) => {
    if (Number(q1[key]) !== q2[key]) result = false;
  });
  return result;
};

const transInfo = (q1, q2) => {
  let result = {};
  let type;
  let diff = [];

  Object.keys(q1).forEach((key) => {
    if (q1[key] !== q2[key]) {
      diff.push(key);
      result[key] = q1[key] - q2[key];
      if (!type) type = q2[key] - q1[key] < 0 ? "Added" : "Removed";
      //
    }
  });

  return { result, type };
};

const setTransaction = (item, quantity, initQuantity) => {
  let { result, type } = transInfo(quantity, initQuantity);
  let trData = {
    item,
    quantity: result,
    type,
    time: Date.now(),
  };

  return trData;
};

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
          .then((itemData) => {
            let transaction = new Transaction({
              item: `${itemData.brand} ${itemData.name}`,
              quantity: itemData.initQuantity,
              type: "Added",
              time: Date.now(),
            });
            transaction
              .save()
              .then((transData) => res.json({ itemData, transData }))
              .catch((err) => res.send(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => res.json(err));
  } else {
    let item = new Item({ ...data, date: new Date() });
    item
      .save()
      .then((itemData) => {
        let transaction = new Transaction({
          item: `${itemData.brand} ${itemData.name}`,
          quantity: itemData.initQuantity,
          type: "Added",
          time: Date.now(),
        });
        transaction
          .save()
          .then((transData) => res.json({ itemData, transData }))
          .catch((err) => res.send(err));
      })
      .catch((err) => console.log(err));
  }
};

exports.getItemsController = (req, res) => {
  Item.find()
    .then((data) => res.json({ dataCount: data.length, data: data }))
    .catch((err) => res.send(err));
};

exports.getItemsHistoryController = (req, res) => {
  Transaction.find()
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};

exports.updateItemController = (req, res) => {
  Item.findById(req.body.id)
    .then((item) => {
      let itemQuantity = { ...item.initQuantity };
      Object.keys(req.body.props).forEach((key) => {
        item[key] = req.body.props[key];
      });

      if (!isQuantitySame(req.body.props.initQuantity, itemQuantity)) {
        trData = setTransaction(
          item.brand + " " + item.name,
          req.body.props.initQuantity,
          itemQuantity
        );
        item.save().then((item) => {
          let transaction = new Transaction(trData);
          transaction
            .save()
            .then(() => res.json({ item, trData }))
            .catch((err) => res.send(err));
        });
      } else {
        item
          .save()
          .then((item) => res.json({ item }))
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => res.send(err));
};
