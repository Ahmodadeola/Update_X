import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import classes from "./Dashboard.module.css";
import Button from "../UI/Button/Button";
import Product from "../../Components/ItemsDispay/Product/Product";
import Spinner from "../UI/Spinner/Spinner";

class Dashboard extends Component {
  render() {
    console.log(this.props.history);
    let category = this.props.category && this.props.category.slice(0, 6);
    let items = this.props.items && this.props.items.slice(0, 6);
    let emptyStore = (
      <div className={classes.EmptyStore}>
        <p>
          <bold>Your Inventory is empty, add Items</bold>
        </p>
        <Button path="/add-item" value={"Add Item"} />
      </div>
    );
    return (
      <div className={classes.Dashboard}>
        <div className={classes.Section}>
          <h1>Items category</h1>
          <div className={classes.Items}>
            {category
              ? category.map((item) => (
                  <Product
                    type={"category"}
                    key={item.name}
                    name={item.name}
                    brand={""}
                    link={require(`../../Assets/Images/${item.img}`)}
                  />
                ))
              : emptyStore}
          </div>
          <Button
            style={{
              width: "100px",
              height: "50px",
              margin: "auto",
              marginTop: "10px",
              textAlign: "center",
            }}
            value={"View All"}
            path={"/category"}
          />
        </div>
        <div className={classes.Section}>
          <h1>All Items</h1>
          {items && items.length > 0 ? (
            <div className={classes.Items}>
              {this.props.loading ? (
                <Spinner />
              ) : (
                items.map((item) => (
                  <Product
                    type={"products"}
                    key={item.name}
                    name={item.name}
                    brand={item.brand}
                    link={item.img}
                  />
                ))
              )}
            </div>
          ) : (
            emptyStore
          )}

          {items && (
            <Button
              style={{ width: "100px", height: "50px", marginTop: "10px" }}
              value={"View All"}
              path={"/all-items"}
            />
          )}
        </div>
        <div className={classes.Section}>
          <div className={classes.Trans}>
            <table cellSpacing="2" cellPadding="10px" border="2" width="90%">
              <thead colSpan="4">
                <tr>
                  <td>
                    <h1>Recent Transactions</h1>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S/N</td>
                  <td>Type</td>
                  <td>Item</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>S/N</td>
                  <td>Type</td>
                  <td>Item</td>
                  <td>Quantity</td>
                </tr>
                <tr>
                  <td>S/N</td>
                  <td>Type</td>
                  <td>Item</td>
                  <td>Quantity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={classes.Section}>
          <h1>Items Statistics</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    category: state.category,
    loading: state.loading,
  };
};
export default connect(mapStateToProps)(Dashboard);
