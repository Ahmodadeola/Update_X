import React from "react";
import SearchIcon from "../../../Containers/UI/Icons/Icons";
import classes from "./SearchBar.module.css";

export default props => {
	return props.show ? (
		<div className={classes.Input}>
			<input
				className={classes.InputElement}
				type="text"
				placeholder="Enter Item"
				onKeyDown={e => {
					if (e.key === "Enter") props.clicked();
				}}
			/>
			<div className={classes.SearchIcon}>
				<SearchIcon clicked={props.clicked} style={{ borderColor: "#f06" }} />
			</div>
		</div>
	) : (
		<SearchIcon clicked={props.clicked} />
	);
};
