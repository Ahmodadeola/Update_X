import React, { Component } from "react";
import Logo from "../Logo/Logo";
import MobileNav from "../Navigation/MobileNav/MobileNav";
import DrawerToggle from "../Navigation/DrawerToggle/DrawerToggle";
import classes from "./Nav.module.css";
import BackDrop from "../../Containers/UI/BackDrop/BackDrop";
import { activateSearch } from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { removeLink } from "../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {
    showToggle: false,
    showSearchInput: false,
  };

  sideNavHandler = () => {
    let show = this.state.showToggle;
    this.setState({ showToggle: !show });
  };

  activeTabHandler = (e) => {};

  prevButtonHandler = () => {
    this.props.popLink();
    this.props.history.goBack();
  };

  render() {
    const links = this.props.links;
    return (
      <div>
        <div>
          <BackDrop
            show={this.state.showToggle}
            clicked={() => this.sideNavHandler()}
          />
          <nav className={classes.Nav}>
            {this.props.navLinks.length > 1 && (
              <FontAwesomeIcon
                style={{
                  position: "absolute",
                  left: "1em",
                  top: "2em",
                  transform: "scale(1.4, 1.4)",
                }}
                color={"white"}
                icon={"arrow-left"}
                onClick={this.prevButtonHandler}
              />
            )}
            <Logo />
            <FontAwesomeIcon
              style={{
                transform: "scale(1.4, 1.4)",
              }}
              color={"white"}
              icon={"search"}
              onClick={this.props.showSearch}
            />

            <Link to={"/add-quantity"}>
              <FontAwesomeIcon
                className={classes.Plus}
                icon={"plus"}
                title="Add item"
              />
              <span>Add Quantity</span>
            </Link>

            <Link to={"/pick-quantity"}>
              <FontAwesomeIcon
                className={classes.Minus}
                icon={"minus"}
                title="pick item"
              />
              <span>Pick Quantity</span>
            </Link>

            <DrawerToggle clicked={() => this.sideNavHandler()} />
          </nav>
          <MobileNav
            links={links}
            show={this.state.showToggle}
            clicked={() => this.sideNavHandler()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    links: state.globalState.links,
    navLinks: state.globalState.navLinks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSearch: () => dispatch(activateSearch()),
    popLink: () => dispatch(removeLink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
