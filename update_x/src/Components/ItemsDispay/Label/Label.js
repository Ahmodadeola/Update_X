import React from "react";
import classes from "./Label.module.css";

export default (props) => {
  let details = props.brand ? props.brand + " " + props.name : props.name;
  let quantity = props.quantity && props.quantity;
  return (
    <div className={classes.Label}>
      <span>
        {details.length < 43 ? details : details.slice(0, 40) + "..."}
      </span>
      <br />
      <span className={classes.Quantity}>{quantity}</span>
    </div>
  );
};
