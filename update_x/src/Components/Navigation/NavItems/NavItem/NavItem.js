import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./NavItem.module.css";

export default withRouter((props) => (
  <li
    className={classes.NavItem}
    onClick={() => props.history.replace(props.link.path)}
  >
    <Link to={props.link.path} onClick={props.clicked}>
      <FontAwesomeIcon
        icon={props.link.icon}
        style={{ color: "white", paddingRight: "10px" }}
      />
      {props.link.name}
    </Link>
  </li>
));
