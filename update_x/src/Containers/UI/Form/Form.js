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
    console.log(this.state.formEntries[inputId]);
    let updatedFormInputs = {
      ...this.state.formEntries,
    };

    let updatedFormElement = {
      ...updatedFormInputs[inputId],
    };

    if (inputId === "img") {
      if (
        !["image/png", "image/jpeg", "image/jpg"].includes(
          e.target.files[0].type
        )
      )
        return;
      updatedFormElement.elementConfig.file.append("image", e.target.files[0]);
      updatedFormElement.elementConfig.value = e.target.value;
      console.log(e.target.files[0], e.target.value.split("\\").pop());
    } else {
      updatedFormElement.elementConfig.value = e.target.value;
    }

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
    let formData = {},
      file;
    for (var inputId in this.props.formEntries) {
      formData[inputId] = this.props.formEntries[inputId].elementConfig.value;
    }
    if (this.state.formEntries.img) {
      let path = formData.img && formData.img.split("\\").pop();
      formData.img = path;
      file = this.props.formEntries.img.elementConfig.file || null;
    }
    file.append("details", JSON.stringify(formData));
    this.props.passData(file);
  };

  render() {
    let formInputs = [];
    Object.keys(this.state.formEntries).forEach((input) =>
      formInputs.push({
        id: input,
        config: this.state.formEntries[input],
      })
    );

    return (
      <div className={classes.Form}>
        <form
          method="POST"
          onSubmit={this.submitHandler}
          encType={"multipart/form-data"}
        >
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
