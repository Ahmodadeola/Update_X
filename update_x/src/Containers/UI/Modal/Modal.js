import React, { Component } from "react";
import BackDrop from "../BackDrop/BackDrop";
import Auxi from "../../../Hoc/Auxi";
import { fontawesome } from "@fortawesome/react-fontawesome";
import "../../../Components/FontAwesomeIcons";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Auxi>
      <BackDrop clicked={props.modalClosed} show={props.show} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-150vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxi>
  );
};

export default Modal;
