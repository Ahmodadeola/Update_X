import React, { Component } from "react";
import Input from "./Input/Input";
import Button from "../Button/Button";
import classes from "./Form.module.css";

export default class extends Component {
  state = {
    formEntries: this.props.formEntries,
    isFocus: false,
    labelStatic: false,
    allValid: false,
  };

  labelHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState({ labelStatic: true });
    } else this.setState({ labelStatic: false });
    console.log(this.state.labelStatic);
  };

  checkValidity = (inputValue, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = inputValue.trim().length > 0 && isValid;
    }

    if (rules.minValue) {
      isValid = inputValue > 0 && isValid;
    }

    if (rules.minLength) {
      isValid = inputValue.trim().length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = inputValue.trim().length <= rules.minLength;
    }

    return isValid;
  };

  onChangeHandler = (e, inputId) => {
    let updatedFormInputs = {
      ...this.state.formEntries,
    };

    let updatedFormElement = {
      ...updatedFormInputs[inputId],
    };

    updatedFormElement.elementConfig.value = e.target.value;
    updatedFormElement.isTouched = true;
    updatedFormInputs[inputId] = updatedFormElement;
    if (!updatedFormElement.validation) {
      this.setState({ formEntries: updatedFormInputs });
      return;
    }

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.elementConfig.value,
      updatedFormElement.validation
    );
    updatedFormInputs[inputId] = updatedFormElement;

    let allInputValid = true;
    for (var id in updatedFormInputs) {
      allInputValid = allInputValid && updatedFormInputs[id].valid;
    }
    this.setState({ formEntries: updatedFormInputs, allValid: allInputValid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log("It's in submit now");
    let formData = {};
    for (var inputId in this.props.formEntries) {
      formData[inputId] = this.props.formEntries[inputId].elementConfig.value;
    }
    this.props.passData(formData);
  };

  render() {
    let formInputs = [];
    for (var id in this.state.formEntries) {
      formInputs.push({
        id: id,
        config: this.state.formEntries[id],
      });
    }
    // let type = this.props.type,
    //   path;
    // if (type === "products") {
    //   path = "/all-items";
    // } else path = "/category";

    return (
      <div className={classes.Form}>
        <form onSubmit={this.submitHandler}>
          {formInputs.map((input) => (
            <Input
              key={input.id}
              config={input.config.elementConfig}
              inputType={input.config.elementType}
              labelStatic={this.state.labelStatic}
              change={(e) => this.onChangeHandler(e, input.id)}
              blur={(e) => this.labelHandler(e)}
              isInvalid={!input.config.valid}
              isTouched={input.config.isTouched}
            />
          ))}
          <Button disabled={!this.state.allValid} value={"Add Item"} />
        </form>
      </div>
    );
  }
}
