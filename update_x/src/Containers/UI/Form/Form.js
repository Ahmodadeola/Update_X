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
  };

  checkValidity = (inputValue, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = inputValue.trim().length > 0 && isValid;
    }

    if (rules.minValue !== undefined) {
      isValid = inputValue >= rules.minValue && isValid;
    }

    if (rules.minLength) {
      isValid = inputValue.trim().length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = inputValue.trim().length <= rules.minLength;
    }

    return isValid;
  };

  onChangeHandler = (e, inputId, parent = null) => {
    let updatedFormInputs = {
      ...this.state.formEntries,
    };
    let updatedFormElement = parent
      ? {
          ...updatedFormInputs[parent].inputs[inputId],
        }
      : {
          ...updatedFormInputs[inputId],
        };

    updatedFormElement.elementConfig.value = e.target.value;
    if (inputId === "img") {
      if (
        !["image/png", "image/jpeg", "image/jpg"].includes(
          e.target.files[0].type
        )
      )
        return;
      updatedFormElement.elementConfig.file.append("image", e.target.files[0]);
    } else {
      if (!parent) updatedFormInputs[inputId] = updatedFormElement;
      else {
        updatedFormInputs[parent].value[inputId] = e.target.value;
        updatedFormInputs[parent].inputs[inputId] = updatedFormElement;
      }
    }

    updatedFormElement.isTouched = true;

    if (!updatedFormElement.validation) {
      this.setState({ formEntries: updatedFormInputs });
      return;
    }
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.elementConfig.value,
      updatedFormElement.validation
    );

    let allInputValid = true;
    for (var id in updatedFormInputs) {
      if (updatedFormInputs[id].isValid) {
        allInputValid = allInputValid && updatedFormInputs[id].isValid();
      } else allInputValid = allInputValid && updatedFormInputs[id].valid;
    }
    this.setState({ formEntries: updatedFormInputs, allValid: allInputValid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let formData = {},
      file;
    for (var inputId in this.props.formEntries) {
      if (this.props.formEntries[inputId].hasNestedInputs) {
        formData[inputId] = this.props.formEntries[inputId].value;
      } else
        formData[inputId] = this.props.formEntries[inputId].elementConfig.value;
    }
    if (this.state.formEntries.img) {
      let path = formData.img && formData.img.split("\\").pop();
      formData.img = path;
      file = this.props.formEntries.img.elementConfig.file || null;
    }
    file = file || new FormData();
    file.append("details", JSON.stringify(formData));
    this.props.passData(file);
  };

  NestedInputs = (props) => {
    let formInputs = [];
    Object.keys(props.inputs).forEach((input) =>
      formInputs.push({
        id: input,
        config: props.inputs[input],
      })
    );
    return (
      <div className={classes.NestedInput}>
        <em>{props.name}</em>
        <div>
          {formInputs.map((input, id) => (
            <Input
              key={id}
              config={input.config.elementConfig}
              inputType={input.config.elementType}
              labelStatic={this.state.labelStatic}
              change={(e) => this.onChangeHandler(e, input.id, props.parent)}
              blur={(e) => this.labelHandler(e)}
              isInvalid={!input.config.valid}
              isTouched={input.config.isTouched}
            />
          ))}
        </div>
      </div>
    );
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
          {formInputs.map((input) =>
            input.config.hasNestedInputs ? (
              <this.NestedInputs
                key={input.config.name}
                parent={input.config.inputId}
                name={input.config.name}
                inputs={input.config.inputs}
              />
            ) : (
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
            )
          )}
          <Button disabled={!this.state.allValid} value={"Add Item"} />
        </form>
      </div>
    );
  }
}
