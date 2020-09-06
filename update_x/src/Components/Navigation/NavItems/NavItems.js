import React from "react";
import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.module.css";
import { connect } from "react-redux";

const NavItems = (props) => {
  const links = props.links;

  return (
    <div className={classes.NavItems}>
      <ul className={classes.NavItemsUL}>
        {links.map((link, id) => (
          <NavItem link={link} key={id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    links: state.globalState.links,
  };
};

export default connect(mapStateToProps)(NavItems);
