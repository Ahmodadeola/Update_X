import React, { useEffect } from "react";
import { connect } from "react-redux";

import { addLink } from "../../store/actions";
import HistoryRow from "./historyRow/historyRow";

import classes from "./ItemsHistory.module.css";

const ItemHistory = (props) => {
  useEffect(() => {
    props.addPath("/history");
  });

  return (
    <div className={classes.ItemsHistory}>
      <h2>Transaction History</h2>
      <section className={classes.Transactions}>
        {props.transHistory.reverse().map((trans, idx) => (
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
    transHistory: state.items.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPath: (path) => dispatch(addLink(path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemHistory);
