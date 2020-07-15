import React from "react";
import ItemsDisplay from "../../Components/ItemsDispay/ItemsDisplay";
import Button from "../UI/Button/Button";
import classes from "./Products.module.css";
import { connect } from "react-redux";

const Products = (props) => {
  return (
    <div className={classes.Products}>
      <h1>Items</h1>
      <ItemsDisplay type={"products"} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(Products);
