import React, { Component } from "react";
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
import { connect } from "react-redux";
import { fetchData } from "./store/actions/index";
import Spinner from "./Containers/UI/Spinner/Spinner";

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchData();
  }

  // shouldComponentUpdate(props, nextProps) {
  //   console.log(props, nextProps);
  //   return this.state.props !== nextProps;
  // }

  render() {
    return (
      <Aux>
        <Layout>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Switch>
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
  return {
    items: state.items,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(null, mapDispatchToprops)(App);
