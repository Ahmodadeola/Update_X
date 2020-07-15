import React from "react";
import NavItem from "../NavItems/NavItem/NavItem";
import Auxi from "../../../Hoc/Auxi";
import classes from "./MobileNav.module.css";

export default (props) => {
	let navClasses = [classes.MobileNav];
	props.show && navClasses.push(classes.show);
	return (
		<Auxi>
			<div onClick={props.clicked} className={navClasses.join(" ")}>
				<ul>
					{props.links.map((link, id) => (
						<NavItem link={link} key={id} />
					))}
				</ul>
			</div>
		</Auxi>
	);
};
