import React, { Component, Fragment } from "react";
import Layout from "../src/Components/Layout/Layout";
import Aux from "../src/Hoc/Auxi";
import { Route, Switch } from "react-router-dom";
import Products from "./Containers/Products/Products";
import NewItem from "./Containers/AllForms/NewItemForm/NewItemForm";
import Category from "./Containers/Category/Category";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Vendor from "./Containers/AllForms/VendorForm/VendorForm";
import CategoryForm from "./Containers/AllForms/AddCategoryForm/Category";
import CategoryItems from "./Containers/CategoryItems/CategoryItems";
import ItemUpdate from "./Containers/AllForms/ItemUpdate/ItemUpdate";
import { connect } from "react-redux";
import { fetchData, updateItem } from "./store/actions/index";
import Spinner from "./Containers/UI/Spinner/Spinner";
import Button from "./Containers/UI/Button/Button";

class App extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    let emptyStore = (
      <Fragment>
        <h1>Your Inventory is empty, add Items</h1>
        <Button path="/add-item" value={"Add Item"} />
      </Fragment>
    );
    return (
      <Aux>
        <Layout>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route
                path="/add-quantity"
                render={() => <ItemUpdate type={"add"} />}
              />
              <Route
                path="/pick-quantity"
                render={() => <ItemUpdate type={"remove"} />}
              />
              <Route path="/all-items" component={Products} />
              <Route path="/category/:cat" component={CategoryItems} />
              <Route path="/category" component={Category} />
              <Route path="/add-item" component={NewItem} />
              <Route path="/add-category" component={CategoryForm} />
              <Route path="/vendors" component={Vendor} />
              <Route path="/" component={Dashboard} />
            </Switch>
          )}
        </Layout>
      </Aux>
    );
  }
}

const mapStateToprops = (state) => {
  console.log(state.items);
  return {
    items: state.items,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(App);
