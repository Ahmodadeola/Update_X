import init_state from "./init_state";
import * as actions from "./actions/index";
import { fetch } from "whatwg-fetch";
import { ObjectId } from "mongodb";

const filterCategory = (state, items) => {
  let categoryItems = {};
  state.category.forEach((cat) => {
    let catItems = items.filter((item) => item.category === cat.name);
    categoryItems[cat.name] = catItems;
  });
  return categoryItems;
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case actions.GET_ITEMS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.GET_ITEMS_SUCCESS:
      let categoryItems = filterCategory(state, action.items);
      return {
        ...state,
        loading: false,
        items: action.items,
        categoryItems: categoryItems,
      };

    case actions.GET_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actions.ADD_ITEM:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.ADD_ITEM_SUCCESS:
      let newItems = state.items.concat(action.item);
      let newCategoryItems = filterCategory(state, newItems);
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.item),
        categoryItems: newCategoryItems,
      };

    case actions.ADD_ITEM_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case actions.UPDATE_ITEM:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.UPDATE_ITEM_SUCCESS:
      let items = state.items;
      console.log("In update_success", action.item);
      items.forEach((item, id) => {
        if (action.item._id === item._id) {
          console.log(item, id);
          items[id] = action.item;
        }
      });
      // item = items.find((item) => action.item._id === ObjectId(item._id));
      return {
        ...state,
        items: items,
        loading: false,
      };

    case actions.UPDATE_ITEM_FAILED:
      return {
        ...state,
        lodaing: false,
        error: true,
      };

    case actions.ADD_VENDOR:
      return {
        ...state,
        vendors: state.vendors.concat(action.vendor),
      };
    default:
      return state;
  }
};

export default reducer;
