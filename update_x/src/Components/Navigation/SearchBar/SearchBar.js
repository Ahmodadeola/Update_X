import React from "react";
import classes from "./SearchBar.module.css";
import { endSearch } from "../../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const searchBar = (props) => {
  const searchStore = (item) => {};
  return (
    <div>
      <div className={classes.Input}>
        <input
          className={classes.InputElement}
          type="text"
          placeholder="Enter Item"
          onKeyDown={(e) => {
            if (e.key === "Enter") props.removeSearch();
          }}
        />
        <div className={classes.SearchIcon}>
          <FontAwesomeIcon
            icon={"arrow-left"}
            onClick={props.removeSearch}
            style={{
              color: "#f06",
              marginTop: "8px",
              transform: "scale(1.3, 1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    category: state.category,
    vendors: state.vendors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeSearch: () => dispatch(endSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);
