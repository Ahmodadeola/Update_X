import React from "react";
import Label from "../Label/Label";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";

const Product = (props) => {
  const home = "https://update-x.herokuapp.com";
  let category = (
    <Link style={{ textDecoration: "none" }} to={`/category/${props.name}`}>
      <div
        onClick={props.clicked}
        className={classes.Product}
        style={props.style2}
      >
        <div className={classes.Image}>
          <img alt={props.name} src={props.link || "/images/image.jpg"} />
          <Label
            name={props.name}
            quantity={props.quantity + " item(s)"}
            brand={props.brand}
          />
        </div>
      </div>
    </Link>
  );

  let imgLink = props.link || "/images/image.jpg";
  let product = (
    <div>
      <div
        onClick={props.clicked}
        className={classes.Product}
        style={props.style2}
      >
        <div className={classes.Image}>
          <img alt={props.name} src={imgLink} />
          <Label
            quantity={props.quantity}
            name={props.name}
            brand={props.brand}
          />
        </div>
      </div>
    </div>
  );

  return props.type === "products" ? product : category;
};

export default Product;
