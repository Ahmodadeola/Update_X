import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./NavItem.module.css";

export default (props) => (
  <li className={classes.NavItem}>
    <Link to={props.link.path} onClick={props.clicked}>
      <FontAwesomeIcon
        icon={props.link.icon}
        style={{ color: "white", paddingRight: "10px" }}
      />
      {props.link.name}
    </Link>
  </li>
);
