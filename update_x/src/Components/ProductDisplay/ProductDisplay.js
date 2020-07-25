import React, { Component } from "react";
import Button from "../../Containers/UI/Button/Button";
import Input from "../../Containers/UI/Form/Input/Input";
import DataRow from "./DataRow/DataRow";
import { updateItem } from "../../store/actions";
import { connect } from "react-redux";
import classes from "./ProductDisplay.module.css";

class ProductDisplay extends Component {
  myRef = React.createRef();
  state = {
    willEdit: false,
    dataId: null,
    dataEntries: {
      category: this.props.data.category,
      costPrice: this.props.data.costPrice,
      sellPrice: this.props.data.sellPrice,
      quantity: this.props.data.quantity,
      serialNo: this.props.data.serialNo,
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { category, costPrice, sellPrice, quantity, serialNo } = nextProps.data;
    this.setState({
      dataEntries: { category, costPrice, sellPrice, quantity, serialNo },
    });
  }

  editButtonHandler = (id) => {
    this.setState({ willEdit: true, dataId: id });
    console.log(this.state.willEdit, id);
  };

  discardButtonHandler = () => {
    let {
      category,
      costPrice,
      sellPrice,
      quantity,
      serialNo,
    } = this.props.data;
    this.setState({
      willEdit: false,
      dataEntries: { category, costPrice, sellPrice, quantity, serialNo },
    });
  };

  fmtPrice = (price) => {
    let p = String(price).split(""),
      fmtPrice = "";

    while (p.length > 3) {
      fmtPrice = "," + p.splice(p.length - 3, 3).join("");
    }
    return (fmtPrice = p.join("") + fmtPrice);
  };

  onchangeHandler = (e, inputId) => {
    let inputData = {
      ...this.state.dataEntries,
    };
    inputData[inputId] = e.target.value;
    console.log(inputData);

    this.setState({ dataEntries: inputData });
  };

  onBlurHandler = () => {
    this.setState({ willEdit: false });
  };

  onSaveButtonHandler = () => {
    let data = {
      props: this.state.dataEntries,
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
                change={(e) => this.onchangeHandler(e, entry)}
                clicked={() => this.editButtonHandler(id)}
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
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveItem: (data) => dispatch(updateItem(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
