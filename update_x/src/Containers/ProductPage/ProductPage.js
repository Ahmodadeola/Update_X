import React, { useState, useEffect } from "react";
import classes from "./ProductPage.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import { updateImage, addLink } from "../../store/actions";
import ProductDisplay from "../../Components/ProductDisplay/ProductDisplay";
import { connect } from "react-redux";

const ProductPage = (props) => {
  let id = Number(props.location.pathname.split("/").splice(-1).toString());
  let item = props.items[id];
  let imgLink = item.img || "https://update-x.herokuapp.com/images/image.jpg";
  let info;

  useEffect(() => {
    props.addPath(`/items/${id}`);
  });

  if (item.initQuantity) {
    info = "";
    Object.entries(item.initQuantity).forEach(([key, value]) => {
      info = info.concat(`${value} ${key}, `);
    });
  }

  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [imageData, setImageData] = useState(new FormData());

  const fmtPrice = (price) => {
    let p = String(price).split(""),
      fmtPrice = "";

    while (p.length > 3) {
      fmtPrice = "," + p.splice(p.length - 3, 3).join("");
    }
    return (fmtPrice = p.join("") + fmtPrice);
  };

  let data = [
    ["Name", item.name],
    ["Brand", item.brand || "None"],
    ["Category", item.category || "None"],
    ["Description", item.description || "None"],
    ["Quantity", item.quantity ? item.quantity + " units" : info],
    ["Sell Price", fmtPrice(item.sellPrice)],
    ["Cost Price", fmtPrice(item.costPrice)],
    ["Date Added", new Date(item.date).toLocaleString().substr(0, 24)],
  ];

  const DataRow = (props) => (
    <tr>
      <td>{props.entry[0]}: </td>
      <td>{props.entry[1]}</td>
    </tr>
  );

  const onChangeHandler = (e) => {
    let image = new FormData();
    image.append("value", e.target.files[0].name);
    image.append("image", e.target.files[0]);
    image.append("id", item._id);
    setImageData(image);
  };

  const changeImage = (e) => {
    e.preventDefault();
    props.updateImage(imageData);
  };

  return (
    <div className={classes.ProductPage}>
      <Modal modalClosed={() => setShowModal(false)} show={showModal}>
        <ProductDisplay data={item} />
      </Modal>
      <table className={classes.Table} cellSpacing="0">
        <thead>
          <tr>
            <td colSpan="3" border="1">
              <h2>{(item.brand + " " + item.name).trim()}</h2>
              <img
                className={classes.ItemImage}
                src={imgLink}
                alt={item.name}
              />
              {!showInput ? (
                <Button
                  style={{
                    height: "35px",
                    width: "110px",
                  }}
                  value={"change"}
                  clicked={() => setShowInput(true)}
                />
              ) : (
                <div className={classes.Input}>
                  <form onSubmit={changeImage}>
                    <input type="file" onChange={onChangeHandler} />
                    <Button
                      disabled={!imageData.get("image")}
                      value={"apply"}
                      style={{
                        width: "60px",
                        height: "40px",
                      }}
                    />
                  </form>
                </div>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <DataRow key={d} entry={d} />
          ))}
        </tbody>
      </table>
      <Button
        divStyle={{
          position: "relative",
          top: "3.5em",
        }}
        value={"Edit Item"}
        clicked={() => setShowModal(true)}
      />
    </div>
  );
};

const mapStateToprops = (state) => {
  return {
    items: state.items.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
    updateImage: (data) => dispatch(updateImage(data)),
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(ProductPage);
