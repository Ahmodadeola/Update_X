import React, { Component } from "react";
import Modal from "../../Containers/UI/Modal/Modal";
import Product from "./Product/Product";
import Button from "../../Containers/UI/Button/Button";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { connect } from "react-redux";
import { fetchData } from "../../store/actions/index";
import classes from "./ItemsDisplay.module.css";

class ItemsDisplay extends Component {
  state = {
    showModal: false,
    items: this.props.items || this.props.products,
    data: null,
    itemStartIndex: 0,
  };

  getItems = () => {
    return this.props.items || this.props.products;
  };

  moreItemHandler = () => {
    let currCount = this.state.itemStartIndex + 16;
    if (currCount <= this.getItems().length) {
      this.setState({ itemStartIndex: currCount });
    }
  };

  prevItemsHandler = () => {
    let currCount = this.state.itemStartIndex - 16;
    if (currCount <= 0) {
      this.setState({ itemStartIndex: currCount });
    }
  };

  itemClickHandler = (data) => {
    this.setState({ showModal: true, data: data });
  };

  modalClosed = () => this.setState({ showModal: false });

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let allItems = this.getItems();

    if (!allItems || allItems.length == 0)
      return (
        <div className={classes.EmptyStore}>
          <p>
            <bold>Your Inventory is empty</bold>
          </p>
          <Button path="/add-item" value={"Add Item"} />
        </div>
      );
    let remainItemsCount = allItems.length - this.state.itemStartIndex,
      nextItemsCount =
        remainItemsCount > 16
          ? this.state.itemStartIndex + 16
          : this.state.itemStartIndex + remainItemsCount;
    let items =
      this.props.type === "products"
        ? allItems.slice(this.state.itemStartIndex, nextItemsCount)
        : this.props.cat;

    return (
      <div>
        <Modal
          type={this.props.type}
          modalClosed={this.modalClosed}
          show={this.state.showModal}
        >
          {this.state.data && <ProductDisplay data={this.state.data} />}
        </Modal>
        <div className={classes.ItemsDisplay}>
          {items.map((product) => {
            let info = "";
            product.initQuantity !== null &&
              product.initQuantity !== undefined &&
              Object.entries(product.initQuantity).forEach(([key, value]) => {
                info = info.concat(`${value} ${key}, `);
              });
            return this.props.type === "products" ? (
              <Product
                type={this.props.type}
                clicked={() => this.itemClickHandler(product)}
                link={product.img}
                name={product.name}
                brand={product.brand}
                key={product.name}
                quantity={info}
              />
            ) : (
              <Product
                type={this.props.type}
                key={product.name}
                link={product.img}
                name={product.name}
                quantity={this.props.catItems[product.name].length}
              />
            );
          })}
        </div>
        <div className={classes.Buttons}>
          {remainItemsCount > 16 ? (
            <Button
              clicked={() => this.moreItemHandler()}
              value={"Next Items"}
            />
          ) : null}
          {this.state.itemStartIndex > 0 ? (
            <Button
              clicked={() => this.prevItemsHandler()}
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
    products: state.items.items,
    cat: state.categories.category,
    catItems: state.items.categoryItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItems: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsDisplay);
