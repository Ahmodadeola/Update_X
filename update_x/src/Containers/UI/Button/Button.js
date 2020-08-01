import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

export default (props) => (
  <div className={classes.Button}>
    {props.path ? (
      <Link to={props.path}>
        <button onClick={props.clicked} style={props.style}>
          {props.value}
        </button>
      </Link>
    ) : (
      <button onClick={props.clicked} style={props.style}>
        {props.value}
      </button>
    )}
  </div>
);
