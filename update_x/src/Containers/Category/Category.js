import React, { Component } from "react";
import ItemsDisplay from "../../Components/ItemsDispay/ItemsDisplay";
import Button from "../UI/Button/Button";
import classes from "./Category.module.css";
import { addLink } from "../../store/actions/index";
import { connect } from "react-redux";

class Category extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.addPath("/category");
  }

  render() {
    console.log(this.props.category);
    return (
      <div className={classes.Category}>
        <h1>Category</h1>
        <ItemsDisplay type={"category"} items={this.props.category} />
        <Button path={"/add-category"} value={"ADD CATEGORY"} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Category);
