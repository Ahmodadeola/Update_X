import React, { Component } from "react";
import Form from "../../UI/Form/Form";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
// import classes from "./NewItemForm.module.css";

class NewItem extends Component {
  state = {
    formEntries: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          value: "",
          placeholder: "Item Name",
          name: "itemName",
        },
        validation: {
          required: true,
        },
        valid: false,
        isTouched: false,
      },

      brand: {
        elementType: "input",
        elementConfig: {
          type: "text",
          value: "",
          placeholder: "Brand",
          name: "brand",
        },
        valid: true,
        isTouched: false,
      },

      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          value: "",
          placeholder: "Item Description",
        },

        valid: true,
        isTouched: false,
      },

      serialNo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          value: "",
          placeholder: "Serial No.",
          name: "serialNo",
        },
        valid: true,
        isTouched: false,
      },

      quantity: {
        elementType: "input",
        elementConfig: {
          type: "number",
          value: "",
          placeholder: "Item Quantity",
          name: "quantity",
        },
        validation: {
          required: true,
          minValue: 1,
        },
        valid: false,
        isTouched: false,
      },

      costPrice: {
        elementType: "input",
        elementConfig: {
          type: "number",
          value: "",
          placeholder: "Cost Price(N)",
          name: "cost",
        },
        validation: {
          required: true,
          minValue: 1,
        },
        valid: false,
        isTouched: false,
      },

      sellPrice: {
        elementType: "input",
        elementConfig: {
          type: "number",
          value: "",
          placeholder: "Selling Price(N)",
          name: "sellPrice",
        },
        validation: {
          required: true,
          minValue: 1,
        },
        valid: false,
        isTouched: false,
      },

      category: {
        elementType: "select",
        elementConfig: {
          type: "text",
          name: "category",
          value: "None",
          placeholder: "Item Name",
          options: [{ name: "category" }]
            .concat(this.props.category)
            .map((cat) => ({
              value: cat.name,
              description: cat.name,
            })),
        },
        valid: true,
        isTouched: false,
      },

      img: {
        elementType: "input",
        elementConfig: {
          type: "file",
          value: "",
          placeholder: "Item Image",
          name: "image",
        },

        valid: true,
        isTouched: false,
      },
    },
  };

  passData = (data) => {
    console.log(data);
    this.props.addItem(data);
    this.props.history.replace("/all-items");
  };

  render() {
    return (
      <div>
        <Form
          type={"products"}
          passData={this.passData}
          formEntries={this.state.formEntries}
        />
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
    addItem: (item) => dispatch(actions.addItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
