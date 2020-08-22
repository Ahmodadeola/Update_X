import React from "react";
import { connect } from "react-redux";
import Form from "../../UI/Form/Form";

const VendorForm = (props) => {
  const formEntries = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "Vendor's Business Name",
        name: "vendor",
      },
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      isTouched: false,
    },

    address: {
      elementType: "input",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "Company's address",
        name: "address",
      },
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      isTouched: false,
    },

    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "City/State",
        name: "city",
      },
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      isTouched: false,
    },

    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        value: "",
        placeholder: "Country",
        name: "country",
      },
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      isTouched: false,
    },
  };

  const passData = (data) => {
    props.history.replace("/category");
  };

  return (
    <div>
      <Form passData={passData} formEntries={formEntries} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVendor: (vendor) => dispatch({ type: "ADD_VENDOR", vendor: vendor }),
  };
};

export default connect(null, mapDispatchToProps)(VendorForm);
