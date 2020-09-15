import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./Dashboard.module.css";

import historyRow from "../../Containers/ItemsHistory/historyRow/historyRow";
import Button from "../UI/Button/Button";
import Product from "../../Components/ItemsDispay/Product/Product";
import Spinner from "../UI/Spinner/Spinner";
import HistoryRow from "../../Containers/ItemsHistory/historyRow/historyRow";
import { addLink } from "../../store/actions";

class Dashboard extends Component {
  render() {
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

    let emptyCat = (
      <div className={classes.EmptyStore}>
        <p>
          <bold>Your category list is empty</bold>
        </p>
        <Button
          style={{
            height: "47px",
            fontSize: ".66em",
          }}
          path="/add-category"
          value={"Add Category"}
        />
      </div>
    );

    return (
      <div className={classes.Dashboard}>
        <div className={classes.Section}>
          <h1>Category</h1>
          {category && category.length > 0 ? (
            <div className={classes.Items}>
              {category.map((cat) => (
                <Product
                  type={"category"}
                  name={cat.name}
                  key={cat.name}
                  quantity={this.props.catItems[cat.name].length}
                  link={"/images/image.jpg"}
                />
              ))}
            </div>
          ) : (
            emptyCat
          )}

          {category && category.length > 0 ? (
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
          ) : null}
        </div>
        <div className={classes.Section}>
          <h1>Items</h1>
          {items && items.length > 0 ? (
            <div className={classes.Items}>
              {this.props.loading ? (
                <Spinner />
              ) : (
                items.map((item, id) => (
                  <Link to={`/items/${id}`} key={item.name}>
                    <Product
                      type={"products"}
                      name={item.name}
                      brand={item.brand}
                      link={item.img}
                    />
                  </Link>
                ))
              )}
            </div>
          ) : (
            emptyStore
          )}

          {items && items.length > 0 && (
            <Button
              style={{ width: "100px", height: "50px", marginTop: "10px" }}
              value={"View All"}
              path={"/all-items"}
            />
          )}
        </div>

        <div className={classes.Section}>
          <h1>Transaction history</h1>
          <div className={classes.Trans}>
            {this.props.history.slice(0, 5).map((trans, idx) => (
              <HistoryRow
                type={trans.type}
                time={new Date(trans.time)}
                item={trans.item}
                key={idx}
                quantity={trans.quantity}
              />
            ))}
          </div>
          <Button
            value="view all"
            path="/history"
            clicked={() => this.props.addPath("/history")}
          />
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
    items: state.items.items,
    catItems: state.items.categoryItems,
    history: [...state.items.history].reverse(),
    category: state.categories.category,
    loading: state.globalState.loading,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    addPath: (link) => dispatch(addLink(link)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Dashboard);
