import React from "react";
import Input from "../../../Containers/UI/Form/Input/Input";
import { connect } from "react-redux";
import Button from "../../../Containers/UI/Button/Button";

const DataRow = (props) => {
  let options = props.options.map((cat) => ({
    value: cat.name,
    description: cat.name,
  }));

  const input =
    props.type === "quantity" ? (
      {}
    ) : props.inputType === "select" ? (
      <Input
        change={props.change}
        options={options}
        inputType={props.inputType}
        blur={() => this.onBlurHandler()}
      />
    ) : (
      <input
        onBlur={props.blur}
        type="number"
        value={props.value}
        onChange={props.change}
      />
    );
  const fmtPrice = (price) => {
    let p = String(price).split(""),
      fmtPrice = "";

    while (p.length > 3) {
      fmtPrice = "," + p.splice(p.length - 3, 3).join("");
    }
    return (fmtPrice = p.join("") + fmtPrice);
  };

  const fmtValue = (type, value) => {
    if (["costPrice", "sellPrice"].includes(type)) return fmtPrice(value);
    let info = "";
    if (type === "quantity") {
      let quantityObj = JSON.parse(value);
      if (typeof quantityObj !== "object") return value;
      console.log(type, value);
      Object.entries(quantityObj).forEach(([key, value]) => {
        info = info.concat(`${value} ${key}, `);
      });
      return info;
    }
    return value;
  };
  return props.value !== undefined && props.value !== null ? (
    <tr>
      <td>
        <p>
          <span>{props.type[0].toUpperCase() + props.type.substr(1)}</span>:
        </p>
      </td>
      <td>
        {props.willEdit && props.dataId === props.id ? (
          input
        ) : (
          <p>{fmtValue(props.type, props.value)}</p>
        )}
      </td>
      <td>
        <Button
          clicked={props.clicked}
          value={"edit"}
          style={{
            width: "70px",
            height: "40px",
            padding: "8px",
          }}
        />
      </td>
    </tr>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    options: state.category,
  };
};

export default connect(mapStateToProps)(DataRow);