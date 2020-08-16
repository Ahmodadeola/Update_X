import React, { Component } from "react";
import ItemsDisplay from "../../Components/ItemsDispay/ItemsDisplay";
import Button from "../UI/Button/Button";
import classes from "./Products.module.css";
import { addLink } from "../../store/actions/index";
import { connect } from "react-redux";

class Products extends Component {
  state = {};

  componentWillMount() {
    this.props.addPath("/add-items");
  }

  render() {
    return (
      <div className={classes.Products}>
        <h1>Items</h1>
        <ItemsDisplay type={"products"} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
