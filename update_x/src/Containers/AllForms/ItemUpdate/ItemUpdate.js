import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import classes from "./ItemUpdate.module.css";
import { connect } from "react-redux";
import Form from "../../UI/Form/Form";
import { addLink } from "../../../store/actions";
import { updateQuantity } from "../../../store/actions/actions";

class ItemUpdate extends Component {
  state = {
    itemID: null,
  };
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    this.props.addPath("/add-quantity");
    window.scrollTo(0, 0);
  }

  passData = (data) => {
    data = JSON.parse(data.get("details"));
    let item = this.props.items.find((item) => item.name === data.item);
    console.log(item);
    this.props.type === "add"
      ? this.props.updateQuantity(
          item._id,
          Number(item.quantity) + Number(data.quantity)
        )
      : this.props.updateQuantity(item._id, item.quantity - data.quantity);
    this.props.history.replace("/");
  };

  render() {
    const formInput = {
      item: {
        elementType: "select",
        elementConfig: {
          type: "text",
          name: "category",
          value: "None",
          placeholder: "Item Name",
          options: [{ name: "Select Item" }]
            .concat(this.props.items)
            .map((item) => ({
              value: item.name,
              description: `${item.brand || ""} ${item.name}`,
            })),
        },
        validation: {
          required: true,
        },
        valid: false,
        isTouched: false,
      },

      initQuantity: {
        hasNestedInputs: true,
        inputId: "initQuantity",
        name: "How much quantity do you currently have",
        isValid: function () {
          let inputs = Object.values(this.inputs);
          return inputs.some((input) => input.elementConfig.value !== "");
        },

        value: {
          carton: 0,
          subCarton: 0,
          unit: 0,
        },
        inputs: {
          carton: {
            elementType: "input",
            elementConfig: {
              type: "number",
              value: "",
              placeholder: "Carton",
              name: "quantity",
            },
            validation: {
              required: false,
              minValue: 1,
            },
            valid: true,
            isTouched: false,
          },

          subCarton: {
            elementType: "input",
            elementConfig: {
              type: "number",
              value: "",
              placeholder: "subcarton",
              name: "quantity",
            },
            validation: {
              required: false,
              minValue: 1,
            },
            valid: true,
            isTouched: false,
          },

          unit: {
            elementType: "input",
            elementConfig: {
              type: "number",
              value: "",
              placeholder: "units",
              name: "quantity",
            },
            validation: {
              required: true,
              minValue: 1,
            },
            valid: true,
            isTouched: false,
          },
        },
      },
    };
    let title =
      this.props.type === "add" ? "Add Item Quantity" : "Remove Item Quantity";
    return (
      <Fragment>
        <h2 className={classes.ItemUpdate}>{title}</h2>
        <Form
          formEntries={formInput}
          type={"products"}
          passData={this.passData}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
    updateQuantity: (item, value) => dispatch(updateQuantity(item, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemUpdate));
