import React from "react";
import { connect } from "react-redux";
import { Fragment } from "react";

const ErrorHandler = (wrappedComponent) => {
  return connect(mapStateToProps)((props) => (
    <Fragment>
      {!props.err ? (
        <wrappedComponent {...props} />
      ) : (
        <div>Sorry, An error Occured</div>
      )}
    </Fragment>
  ));
};

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    error: state.globalState.error,
  };
};

export default ErrorHandler;
