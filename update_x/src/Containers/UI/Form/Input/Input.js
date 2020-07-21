import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputType = props.inputType;
  let inputClasses = [classes.Input];
  let inputElement;

  if (props.isTouched && props.isInvalid) {
    inputClasses.push(classes.invalid);
  }
  switch (inputType) {
    case "input":
      let config = props.config || props;
      inputElement = (
        <div className={inputClasses.join(" ")}>
          <input
            type={config.type}
            value={config.value}
            name={config.name}
            onChange={props.change}
            onBlur={props.blur}
          />
          <label
            className={
              config && (config.value.length === 0 ? "" : classes.hangedLabel)
            }
            htmlFor={config.name}
          >
            {config.placeholder}
          </label>
        </div>
      );
      break;

    case "select":
      let options = (props.config && props.config.options) || props.options;
      console.log(options);
      inputElement = (
        <div className={classes.Select}>
          <select onChange={props.change}>
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.description}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div className={classes.Textarea}>
          <textarea
            onBlur={props.blur}
            onChange={props.change}
            value={props.config.value}
          ></textarea>
          <label
            className={
              props.config.value.length === 0 ? "" : classes.hangedLabel
            }
          >
            {props.config.placeholder}
          </label>
        </div>
      );
      break;
    default:
      inputElement = <input {...props} />;
  }

  return inputElement;
};

export default Input;
