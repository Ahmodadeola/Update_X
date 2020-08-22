import React from "react";
import Form from "../../UI/Form/Form";
import { addCategory } from "../../../store/actions";
import { connect } from "react-redux";

const Category = (props) => {
  const formEntries = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "Category",
        name: "category",
      },
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      isTouched: false,
    },

    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "Description",
        name: "description",
      },
      valid: true,
      isTouched: false,
    },

    img: {
      elementType: "input",
      elementConfig: {
        type: "file",
        value: "",
        placeholder: "",
        name: "image",
        file: new FormData(),
      },
      validation: {
        required: false,
      },
      valid: true,
      isTouched: false,
    },
  };

  const passData = (data) => {
    props.addCategory(data);
    props.history.replace("/category");
  };
  return (
    <div>
      <Form type={"category"} formEntries={formEntries} passData={passData} />
    </div>
  );
};

const mapDispatchToprops = (dispatch) => {
  return {
    addCategory: (data) => dispatch(addCategory(data)),
  };
};

export default connect(null, mapDispatchToprops)(Category);
