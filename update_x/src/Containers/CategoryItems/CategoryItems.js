import React, { Component } from "react";
import ItemsDisplay from "../../Components/ItemsDispay/ItemsDisplay";
import Button from "../UI/Button/Button";
import { connect } from "react-redux";
import classes from "./CategoryItems.module.css";
import { addLink } from "../../store/actions";

class CategoryItems extends Component {
  state = {
    items: this.getItems(),
    itemStartIndex: 0,
    category: this.getItemsCat(),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.addPath(`/category/${this.state.category}`);
  }

  moreItemHandler = () => {
    let currCount = this.state.itemStartIndex + 15;
    if (currCount <= this.state.items.length) {
      this.setState({ itemStartIndex: currCount });
    }
  };

  prevItemsHandler = () => {
    let currCount = this.state.itemStartIndex - 15;
    console.log("Handling the prev button", currCount);
    if (currCount <= 0) {
      this.setState({ itemStartIndex: currCount });
    }
  };

  getItems() {
    let reqParts = this.props.location.pathname.split("/");
    let category = reqParts[reqParts.length - 1];
    return this.props.items && this.props.items[category];
  }

  getItemsCat() {
    let reqParts = this.props.location.pathname.split("/");
    return reqParts[reqParts.length - 1];
  }

  render() {
    let items = this.state.items;
    let remainItemsCount = items && items.length - this.state.itemStartIndex,
      nextItemsCount =
        remainItemsCount > 15
          ? this.state.itemStartIndex + 15
          : this.state.itemStartIndex + remainItemsCount;

    return !items || items.length === 0 ? (
      <div className={classes.EmptyCategory}>
        <h5>{this.state.category} is empty</h5>
      </div>
    ) : (
      <div className={classes.CategoryItems}>
        <h1>{this.state.category}</h1>
        <ItemsDisplay type={"products"} items={items} />
        <div className={classes.Buttons}>
          {remainItemsCount > 15 ? (
            <Button
              onClick={() => this.moreItemHandler()}
              value={"Next Items"}
            />
          ) : null}
          {this.state.itemStartIndex > 0 ? (
            <Button
              onClick={() => this.prevItemsHandler()}
              value={"Prev Items"}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.categoryItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItems);
