import * as actions from "../actions";
import CategoryItems from "../../Containers/CategoryItems/CategoryItems";

const init_state = {
  items: [],
  history: [],
  category: [],
  categoryItems: [],
  loading: false,
  error: false,
};

const filterCategory = (category, items) => {
  let categoryItems = {};
  category.forEach((cat) => {
    let catItems = items.filter((item) => item.category === cat.name);
    categoryItems[cat.name] = catItems;
  });
  return categoryItems;
};

const itemsReducer = (state = init_state, action) => {
  let categoryItems;
  switch (action.type) {
    case actions.GET_ITEMS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.GET_ITEMS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        items: action.items,
      };

    case actions.GET_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actions.GET_HISTORY:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.GET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        history: action.history,
      };

    case actions.GET_HISTORY_FAILED:
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
      let newCategoryItems = filterCategory(state.category, newItems);
      return {
        ...state,
        loading: false,
        items: [action.item, ...state.items],
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

    case actions.GET_CATEGORIES_SUCCESS:
      categoryItems = filterCategory(action.categories, state.items);
      return {
        ...state,
        category: action.categories,
        categoryItems,
      };

    case actions.UPDATE_ITEM_SUCCESS:
      let items = [...state.items];
      items.forEach((item, id) => {
        if (action.item._id === item._id) {
          items[id] = action.item;
        }
      });
      return {
        ...state,
        items: items,
        loading: false,
      };

    case actions.UPDATE_ITEM_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default itemsReducer;
