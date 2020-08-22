import * as actions from "./actionTypes";
const home = "https://update-x.herokuapp.com";

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

const addCategorySync = (cat) => {
  return {
    type: actions.ADD_CATEGORY,
    category: cat,
  };
};

const addCategorySuccess = (cat) => {
  return {
    type: actions.ADD_CATEGORY_SUCCESS,
    category: cat,
  };
};

const addCategoryFailed = () => {
  return {
    type: actions.ADD_CATEGORY_FAILED,
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    dispatch(addCategorySync());
    fetch(`${home}/api/addcategory`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => dispatch(addCategorySuccess(data)))
      .catch(() => dispatch(addCategoryFailed()));
  };
};

const getCategories = () => {
  return {
    type: actions.GET_CATEGORIES,
  };
};

const getCategoriesSuccess = (cat) => {
  return {
    type: actions.GET_CATEGORIES_SUCCESS,
    categories: cat,
  };
};

const getCategoriesFailed = () => {
  return {
    type: actions.GET_CATEGORIES_FAILED,
  };
};

const getItems = () => {
  return {
    type: actions.GET_ITEMS,
  };
};

const getItemsSuccess = (items) => {
  return {
    type: actions.GET_ITEMS_SUCCESS,
    items: items.reverse(),
  };
};

const getItemsFailed = () => {
  return {
    type: actions.GET_ITEMS_FAILED,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(getItems());
    fetch(`${home}/api/getitems`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getItemsSuccess(data.data));
      })
      .catch((err) => {
        console.log("Items fetch failed here");
        console.log(err);
        dispatch(getItemsFailed());
      });
    dispatch(getCategories());
    fetch(`${home}/api/getcategories`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getCategoriesSuccess(data.data));
      })
      .catch((err) => {
        dispatch(getCategoriesFailed());
      });
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

export const updateItem = (data) => {
  return (dispatch) => {
    dispatch(updateItemSync());
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
    fetch(`${home}/updateimage`, {
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
