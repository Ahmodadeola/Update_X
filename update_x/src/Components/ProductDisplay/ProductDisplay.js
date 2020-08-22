import React, { Component } from "react";
import Button from "../../Containers/UI/Button/Button";
import DataRow from "./DataRow/DataRow";
import { updateItem } from "../../store/actions";
import { connect } from "react-redux";
import classes from "./ProductDisplay.module.css";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  state = {
    willEdit: false,
    dataId: null,
    dataEntries: {
      category: this.props.data.category,
      costPrice: this.props.data.costPrice,
      sellPrice: this.props.data.sellPrice,
      quantity: { ...this.props.data.initQuantity },
      serialNo: this.props.data.serialNo,
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { category, costPrice, sellPrice, serialNo } = nextProps.data;
    let quantity = nextProps.data.initQuantity;
    this.setState({
      willEdit: false,
      dataEntries: { category, costPrice, sellPrice, quantity, serialNo },
    });
  }

  editButtonHandler = (id) => {
    this.setState({ willEdit: true, dataId: id });
    console.log(this.state.willEdit, id);
  };

  discardButtonHandler = () => {
    let { category, costPrice, sellPrice, serialNo } = this.props.data;
    let quantity = { ...this.props.data.initQuantity };
    this.setState({
      willEdit: false,
      dataEntries: { category, costPrice, sellPrice, quantity, serialNo },
    });
  };

  onChangeHandler = (e, inputId, parent) => {
    let inputData = {
      ...this.state.dataEntries,
    };
    if (parent) {
      inputData[parent][inputId] = e.target.value;
    } else inputData[inputId] = e.target.value;
    console.log(inputData)
    this.setState({ dataEntries: inputData });
  };

  HOChangeHandler = (parent) => (e, inputId) =>
    parent === "quantity"
      ? this.onChangeHandler(e, inputId, parent)
      : this.onChangeHandler(e, inputId);

  onBlurHandler = () => {
    this.setState({ willEdit: false });
  };

  onSaveButtonHandler = () => {
    let data = {
      props: {
        ...this.state.dataEntries,
        initQuantity: this.state.dataEntries.quantity,
      },
      id: this.props.data._id,
    };
    console.log(data);
    this.props.saveItem(data);
  };

  render() {
    let data = this.state.dataEntries,
      name = this.props.data.name,
      brand = this.props.data.brand;

    let dataEntries = this.state.dataEntries;

    return (
      <div className={classes.ProductDisplay}>
        <table>
          <thead>
            <tr>
              <td colSpan="3">
                <h4>{brand + " " + name}</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(dataEntries).map((entry, id) => (
              <DataRow
                inputType={entry == "category" ? "select" : "input"}
                dataId={this.state.dataId}
                willEdit={this.state.willEdit}
                change={this.HOChangeHandler(entry)}
                clicked={this.editButtonHandler.bind(this, id)}
                id={id}
                key={id}
                type={entry}
                value={dataEntries[entry]}
                blur={() => this.onBlurHandler()}
              />
            ))}
          </tbody>
        </table>
        <div className={classes.Buttons}>
          <Button
            clicked={() => this.onSaveButtonHandler()}
            value={"Save"}
            style={{ margin: "5px" }}
          />
          <Button
            value={"Discard"}
            style={{ margin: "5px" }}
            clicked={() => this.discardButtonHandler()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.categories.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveItem: (data) => dispatch(updateItem(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
