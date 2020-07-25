import React, { Component, Fragment } from "react";
import classes from "./SearchBar.module.css";
import { endSearch } from "../../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: this.getSuggestions(),
      userInput: "",
      filteredSuggestions: null,
      activeSuggestion: 0,
    };
  }

  onChangeHandler = (e) => {
    let sug = this.getFilteredSuggestion(e.target.value);
    console.log(this.props.suggestions, sug);
    this.setState({ filteredSuggestions: sug, userInput: e.target.value });
  };

  onKeyDownHandler = (e, id = null) => {
    let suggestions = this.state.filteredSuggestions;
    let idx;
    if (e.key === "Enter" && this.state.userInput.length > 0) {
      let activeSuggestion = suggestions.find(
        (each) => each.desc.trim() === this.state.userInput
      );
      this.onClickHandler(e, activeSuggestion.id);
    } else if (e.key === "ArrowUp") {
      idx =
        suggestions && this.state.activeSuggestion < 0
          ? Object.entries(suggestions).length - 1
          : this.state.activeSuggestion;
      this.setState({
        userInput: suggestions[idx].desc.trim(),
        activeSuggestion: --idx,
      });
    } else if (e.key === "ArrowDown") {
      idx =
        this.state.activeSuggestion %
        (suggestions && Object.entries(suggestions).length);
      this.setState({
        userInput: suggestions[idx].desc.trim(),
        activeSuggestion: ++idx,
      });
    }
  };

  getFilteredSuggestion(searchKey) {
    return this.props.suggestions.filter(
      (suggestion) => suggestion.desc.indexOf(searchKey.toLowerCase()) > -1
    );
  }

  getSuggestions() {
    let suggestions = [];
    this.props.items.forEach((item) =>
      suggestions.push((item.brand + " " + item.name).toLowerCase().trim())
    );
    return suggestions;
  }

  onClickHandler = (e, id) => {
    console.log(this.props.items[id]);
    this.setState({
      userInput: e.target.innerText,
      activeSuggestion: id,
    });
    this.props.history.replace(`/items/${id}`);
    this.props.removeSearch();
  };

  render() {
    let suggestions = this.state.filteredSuggestions;
    let suggestionsList = (
      <Fragment>
        <ul className={classes.Suggestions}>
          {suggestions && suggestions.length > 0
            ? suggestions.map((suggestion) => (
                <li
                  onClick={(e) => this.onClickHandler(e, suggestion.id)}
                  key={suggestion.id}
                >
                  {suggestion.desc}
                </li>
              ))
            : null}
        </ul>
      </Fragment>
    );
    return (
      <Fragment>
        <div className={classes.Input}>
          <input
            className={classes.InputElement}
            type="text"
            placeholder="Enter Item"
            onChange={(e) => this.onChangeHandler(e)}
            onKeyDown={this.onKeyDownHandler}
            value={this.state.userInput}
          />
          <div className={classes.SearchIcon}>
            <FontAwesomeIcon
              icon={"arrow-left"}
              onClick={this.props.removeSearch}
              style={{
                color: "#f06",
                marginTop: "8px",
                transform: "scale(1.3, 1)",
              }}
            />
          </div>
          {suggestionsList}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  let suggestions = [];
  state.items.forEach((item, id) =>
    suggestions.push({ desc: (item.brand + " " + item.name).toLowerCase(), id })
  );
  return {
    items: state.items,
    category: state.category,
    vendors: state.vendors,
    suggestions: suggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeSearch: () => dispatch(endSearch()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
