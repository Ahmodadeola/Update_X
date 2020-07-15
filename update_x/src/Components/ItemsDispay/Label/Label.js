import React from "react";
import classes from "./Label.module.css";

export default (props) => {
  let details = props.brand ? props.brand + " " + props.name : props.name;
  return (
    <div className={classes.Label}>
      <span>
        {details.length < 55 ? details : details.slice(0, 52) + "..."}
      </span>
    </div>
  );
};
