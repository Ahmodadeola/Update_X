import React from "react";

import { addPath } from "../../../store/actions";
import classes from "./historyRow.module.css";

const formatQuantity = (val) => {
  let strVal = "";
  Object.entries(val).forEach(
    (entry) => (strVal += `${entry[1]} ${entry[0]}, `)
  );
  return strVal;
};

const HistoryRow = (props) => {
  let transTypeClasses = [classes.Type];
  props.type === "Added"
    ? transTypeClasses.push(classes.Green)
    : transTypeClasses.push(classes.Red);

  return (
    <div className={classes.HistoryRow}>
      <span className={classes.Time}>
        {props.time.toLocaleTimeString() + " " + props.time.toDateString()}
      </span>
      <hr />
      <div className={classes.Details}>
        <div className={classes.LeftDetails}>
          <span className={classes.Item}>{props.item}</span>
          <span className={transTypeClasses.join(" ")}>{props.type}</span>
        </div>

        <span className={classes.Quantity}>
          {formatQuantity(props.quantity)}
        </span>
      </div>
    </div>
  );
};

export default HistoryRow;
