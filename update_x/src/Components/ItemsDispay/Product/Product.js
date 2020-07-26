import React from "react";
import Label from "../Label/Label";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";

const Product = (props) => {
  let category = (
    <Link style={{ textDecoration: "none" }} to={`/category/${props.name}`}>
      <div
        onClick={props.clicked}
        className={classes.Product}
        style={props.style2}
      >
        <div className={classes.Image}>
          <img alt={""} src={props.link} />
          <Label name={props.name} brand={props.brand} price={props.price} />
        </div>
      </div>
    </Link>
  );

  let imgLink = (props.link && props.link.split("\\").pop()) || "image.jpg";
  let product = (
    <div>
      <div
        onClick={props.clicked}
        className={classes.Product}
        style={props.style2}
      >
        <div className={classes.Image}>
          <img alt={""} src={`http://localhost:8080/images/${imgLink}`} />
          <Label
            quantity={props.quantity}
            name={props.name}
            brand={props.brand}
            price={props.price}
          />
        </div>
      </div>
    </div>
  );

  return props.type === "products" ? product : category;
};

export default Product;
