import React from "react";
import classes from "./Icons.module.css";

const searchIcon = props => (
	<div className={classes.SearchIcon} onClick={props.clicked}>
		<div style={props.style}></div>
		<div style={props.style}></div>
	</div>
);

export default searchIcon;
