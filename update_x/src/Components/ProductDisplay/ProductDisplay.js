import React, { Component } from "react";
import Button from "../../Containers/UI/Button/Button";
import Input from "../../Containers/UI/Form/Input/Input";
import { updateItem } from "../../store/actions";
import { connect } from "react-redux";
import classes from "./ProductDisplay.module.css";

class ProductDisplay extends Component {
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let { category, costPrice, sellPrice, quantity, serialNo } = nextProps.data;
    this.setState({
      dataEntries: { category, costPrice, sellPrice, quantity, serialNo },
    });
  }

  editButtonHandler = (id) => {
    this.setState({ willEdit: true, dataId: id });
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
      category = data.category || "None",
      cost = data.costPrice,
      sellPrice = data.sellPrice,
      serialNo = data.serialNo,
      quantity = data.quantity,
      name = this.props.data.name,
      brand = this.props.data.brand;

    let dataEntries = this.state.dataEntries;
    let options = this.props.category.map((cat) => ({
      value: cat.name,
      description: cat.name,
    }));
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
            <tr>
              <td>
                <p>
                  <span>Category</span>:
                </p>
              </td>
              <td>
                {this.state.willEdit && this.state.dataId == 0 ? (
                  <Input
                    change={(e) => this.onchangeHandler(e, "category")}
                    options={options}
                    inputType={"select"}
                    blur={() => this.onBlurHandler()}
                  />
                ) : (
                  <p>{category}</p>
                )}
              </td>
              <td>
                <Button
                  clicked={() => this.editButtonHandler(0)}
                  value={"edit"}
                  style={{
                    width: "70px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Cost Price</span>:
                </p>
              </td>
              <td>
                {this.state.willEdit && this.state.dataId == 1 ? (
                  <input
                    onChange={(e) => this.onchangeHandler(e, "costPrice")}
                    type="number"
                    value={cost}
                    onBlur={() => this.onBlurHandler()}
                  />
                ) : (
                  <p>N{this.fmtPrice(cost)}</p>
                )}
              </td>
              <td>
                <Button
                  clicked={() => this.editButtonHandler(1)}
                  value={"edit"}
                  style={{
                    width: "70px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Selling Price</span>:
                </p>
              </td>
              <td>
                {this.state.willEdit && this.state.dataId == 2 ? (
                  <input
                    onChange={(e) => this.onchangeHandler(e, "sellPrice")}
                    type="number"
                    value={sellPrice}
                    onBlur={() => this.onBlurHandler()}
                  />
                ) : (
                  <p>N{this.fmtPrice(dataEntries.sellPrice)}</p>
                )}
              </td>
              <td>
                <Button
                  clicked={() => this.editButtonHandler(2)}
                  value={"edit"}
                  style={{
                    width: "70px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Quantity</span>:
                </p>
              </td>
              <td>
                <p>{quantity} units</p>
              </td>
              <td>
                <Button
                  clicked={() => this.editButtonHandler(3)}
                  value={"edit"}
                  style={{
                    width: "70px",
                  }}
                />
              </td>
            </tr>

            {serialNo && (
              <tr>
                <td>
                  <p>
                    <span>Serial No</span>:
                  </p>
                </td>
                <td>
                  <p>{dataEntries.serialNo}</p>
                </td>
                <td>
                  <Button
                    clicked={() => this.editButtonHandler()}
                    value={"edit"}
                    style={{
                      width: "70px",
                    }}
                  />
                </td>
              </tr>
            )}
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
