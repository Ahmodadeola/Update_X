import React, { Component } from "react";
import Aux from "../../Hoc/Auxi";
import Navbar from "../Navigation/Nav";
import NavItems from "../Navigation/NavItems/NavItems";
import classes from "./Layout.module.css";
import Spinner from "../../Containers/UI/Spinner/Spinner";
import SearchBar from "../../Components/Navigation/SearchBar/SearchBar";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    loading: this.props.loading,
    error: this.props.err,
  };

  render() {
    return (
      <Aux>
        {this.props.showSearch ? (
          <SearchBar />
        ) : (
          <div>
            <header>
              <Navbar />
            </header>
            <main className={classes.Main}>
              <NavItems />
              {!this.props.loading ? (
                <section className={classes.ProductSection}>
                  {this.props.children}
                </section>
              ) : (
                <Spinner />
              )}
            </main>
          </div>
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    err: state.error,
    showSearch: state.searchMode,
  };
};

export default connect(mapStateToProps)(Layout);