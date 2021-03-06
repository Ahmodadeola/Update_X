import React, { Component } from "react";
import Aux from "../../Hoc/Auxi";
import Navbar from "../Navigation/Nav";
import NavItems from "../Navigation/NavItems/NavItems";
import classes from "./Layout.module.css";
import Spinner from "../../Containers/UI/Spinner/Spinner";
import SearchBar from "../../Components/Navigation/SearchBar/SearchBar";
import { connect } from "react-redux";

const Layout = (props) => {
  return (
    <Aux>
      {props.showSearch ? (
        <SearchBar />
      ) : (
        <div>
          <header>
            <Navbar />
          </header>
          <main className={classes.Main}>
            <NavItems />
            {props.err ? (
              <div className={classes.Error}>
                Sorry, An Error Occured, try reloading the page
              </div>
            ) : !props.loading ? (
              <section className={classes.ProductSection}>
                {props.children}
              </section>
            ) : (
              <div className={classes.Spinner}>
                <Spinner />
              </div>
            )}
          </main>
        </div>
      )}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading:
      state.globalState.loading ||
      state.items.loading ||
      state.categories.loading,
    err: state.globalState.error || state.items.error || state.categories.error,
    showSearch: state.globalState.searchMode,
  };
};

export default connect(mapStateToProps)(Layout);
