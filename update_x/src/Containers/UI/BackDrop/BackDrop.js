import React from "react";
import classes from "./BackDrop.module.css";

export default props => {
	return props.show ? (
		<div className={classes.BackDrop} onClick={props.clicked} />
	) : null;
};
