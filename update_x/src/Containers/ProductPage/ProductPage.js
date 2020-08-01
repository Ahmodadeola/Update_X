import React, { Fragment, useState } from "react";
import classes from "./ProductPage.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import ProductDisplay from "../../Components/ProductDisplay/ProductDisplay";
import { connect } from "react-redux";

const ProductPage = (props) => {
  const [showModal, setShowModal] = useState(false);
  let id = Number(props.location.pathname.split("/").splice(-1).toString());
  let item = props.items[id];
  let imgLink = item.img.split("\\").pop() || "image.jpg";
  let info;
  if (item.initQuantity) {
    info = "";
    Object.entries(item.initQuantity).forEach(([key, value]) => {
      console.log(key, value);
      info = info.concat(`${value} ${key}, `);
    });
  }

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
  console.log(imgLink);
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
                src={`https://update-x.herokuapp.com/images/${imgLink}`}
                alt={item.name}
              />
              <Button
                style={{
                  height: "35px",
                  width: "110px",
                }}
                value={"change"}
              />
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
        style={{
          position: "relative",
          top: "3em",
        }}
        value={"Edit Item"}
        clicked={() => setShowModal(true)}
      />
    </div>
  );
};

const mapStateToprops = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToprops)(ProductPage);
