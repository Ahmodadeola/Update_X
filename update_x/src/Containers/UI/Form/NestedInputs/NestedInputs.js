import React from "react";
import classes from "./NestedInputs.module.css";
import Input from "../Input/Input";
const NestedInputs = (props) => {
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
            labelStatic={props.attr.labelStatic}
            change={props.attr.changeHandler}
            blur={props.attr.labelHandler}
            isInvalid={!input.config.valid}
            isTouched={input.config.isTouched}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedInputs;
