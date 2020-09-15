import React from "react";
import { connect } from "react-redux";

import { addLink } from "../../store/actions";
import HistoryRow from "./historyRow/historyRow";

import classes from "./ItemsHistory.module.css";

const ItemHistory = (props) => {
  return (
    <div className={classes.ItemsHistory}>
      <h2>Transaction History</h2>
      <section className={classes.Transactions}>
        {props.transHistory.map((trans, idx) => (
          <HistoryRow
            key={idx}
            quantity={trans.quantity}
            type={trans.type}
            time={new Date(trans.time)}
            item={trans.item}
          />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transHistory: [...state.items.history].reverse(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemHistory);
