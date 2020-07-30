import React, { Component } from "react";
import Modal from "../../Containers/UI/Modal/Modal";
import Product from "./Product/Product";
import images from "../../Assets/Images/game_console.jpg";
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

  myRef = React.createRef();

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

  itemClickHandler = (data) => {
    console.log(data);
    this.setState({ showModal: true, data: data });
  };

  modalClosed = () => this.setState({ showModal: false });

  // componentDidUpdate(props) {
  //   window.scrollTo(0, 0);
  // }

  componentDidMount() {
    console.log("Landed successfully");
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.state.items || this.state.items.length == 0)
      return (
        <div className={classes.EmptyStore}>
          <p>
            <bold>Your Inventory is empty</bold>
          </p>
          <Button path="/add-item" value={"Add Item"} />
        </div>
      );
    let remainItemsCount = this.state.items.length - this.state.itemStartIndex,
      nextItemsCount =
        remainItemsCount > 15
          ? this.state.itemStartIndex + 15
          : this.state.itemStartIndex + remainItemsCount;
    let items =
      this.props.type === "products"
        ? this.state.items.slice(this.state.itemStartIndex, nextItemsCount)
        : this.props.cat;

    return (
      <div ref={this.myRef}>
        <Modal
          type={this.props.type}
          modalClosed={() => this.modalClosed()}
          show={this.state.showModal}
        >
          {this.state.data && <ProductDisplay data={this.state.data} />}
        </Modal>
        <div className={classes.ItemsDisplay}>
          {items.map((product) => {
            let info = "";
            product.initQuantity &&
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
                // link={require(`../../Assets/Images/${product.img}`)}
                link={require(`../../Assets/Images/foods.jpg`)}
                name={product.name}
              />
            );
          })}
        </div>
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
    products: state.items,
    cat: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItems: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsDisplay);
