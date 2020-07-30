import * as actions from "./actionTypes";

const addItemSync = (item) => {
  return {
    type: actions.ADD_ITEM,
  };
};

const addItemSuccess = (item) => {
  return {
    type: actions.ADD_ITEM_SUCCESS,
    item: item,
  };
};

const addItemFailed = () => {
  return {
    type: actions.ADD_ITEM_FAILED,
  };
};

const getitems = () => {
  return {
    type: actions.GET_ITEMS,
  };
};

const updateItemSync = () => {
  return {
    type: actions.UPDATE_ITEM,
  };
};

const updateSuccess = (item) => {
  return {
    type: actions.UPDATE_ITEM_SUCCESS,
    item,
  };
};

const updateFailed = () => {
  return {
    type: actions.UPDATE_ITEM_FAILED,
  };
};

export const addLink = (link) => {
  return {
    type: actions.ADD_LINK,
    link,
  };
};

export const removeLink = (link) => {
  return {
    type: actions.REMOVE_LINK,
    link,
  };
};

export const updateQuantitySync = (itemId, value) => {
  return {
    type: actions.UPDATE_ITEM_QUANTITY,
    data: {
      itemId,
      value,
    },
  };
};

export const updateQuantity = (itemId, value) => {
  let data = {
    id: itemId,
    props: { quantity: value },
  };
  console.log("[actions] the data", data);
  return (dispatch) => {
    dispatch(updateQuantitySync(itemId, value));
    fetch("https://update-x.herokuapp.com/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => dispatch(updateSuccess(data)))
      .catch((err) => dispatch(updateFailed()));
  };
};

export const activateSearch = () => {
  return {
    type: actions.SET_SEARCH_MODE,
  };
};

export const endSearch = () => {
  return {
    type: actions.REMOVE_SEARCH_MODE,
  };
};

export const addItem = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(addItemSync());
    fetch("https://update-x.herokuapp.com/api/additem", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => dispatch(addItemSuccess(data)))
      .catch((err) => {
        console.log(err);
        dispatch(addItemFailed());
      });
  };
};

export const getItemsSuccess = (items) => {
  return {
    type: actions.GET_ITEMS_SUCCESS,
    items: items.reverse(),
  };
};

export const getItemsFailed = () => {
  return {
    type: actions.GET_ITEMS_FAILURE,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(getitems());
    fetch("https://update-x.herokuapp.com/api/getitems")
      .then((res) => res.json())
      .then((data) => {
        dispatch(getItemsSuccess(data.data));
      })
      .catch((err) => {
        dispatch(getItemsFailed());
      });
  };
};

export const updateItem = (data) => {
  return (dispatch) => {
    dispatch(updateItemSync());
    fetch("https://update-x.herokuapp.com/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => dispatch(updateSuccess(data)))
      .catch((err) => dispatch(updateFailed()));
  };
};
