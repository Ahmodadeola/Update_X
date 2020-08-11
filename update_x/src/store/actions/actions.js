import * as actions from "./actionTypes";
const home = "http://localhost:8080";
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
    fetch(`${home}/api/update`, {
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
    fetch(`${home}/api/additem`, {
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
    fetch("/api/getitems")
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
    fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => dispatch(updateSuccess(data)))
      .catch((err) => dispatch(updateFailed()));
  };
};

const updateImageInit = () => {
  return {
    type: actions.UPDATE_IMAGE,
  };
};

const updateImageFailed = () => {
  return {
    type: actions.UPDATE_IMAGE_FAILED,
  };
};

const updateImageSuccess = (data) => {
  return {
    type: actions.UPDATE_IMAGE_SUCCESS,
    data,
  };
};

export const updateImage = (data) => {
  return (dispatch) => {
    dispatch(updateImageInit());
    fetch("/updateimage", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(updateImageSuccess(data));
      })
      .catch((err) => updateImageFailed());
  };
};
