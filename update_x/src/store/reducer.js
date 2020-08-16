import init_state from "./init_state";
import * as actions from "./actions/index";

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

    case actions.GET_ITEMS_FAILED:
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
      let items = [...state.items];
      console.log("In update_success", action.item);
      items.forEach((item, id) => {
        if (action.item._id === item._id) {
          console.log(item, id);
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
        lodaing: false,
        error: true,
      };

    case actions.ADD_VENDOR:
      return {
        ...state,
        vendors: state.vendors.concat(action.vendor),
      };

    case actions.GET_CATEGORIES:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        category: action.categories,
        loading: false,
        error: false,
      };

    case actions.GET_CATEGORIES_FAILED:
      return {
        ...state,
        error: true,
      };
    case actions.SET_SEARCH_MODE:
      return {
        ...state,
        searchMode: true,
      };

    case actions.REMOVE_SEARCH_MODE:
      return {
        ...state,
        searchMode: false,
      };

    case actions.ADD_LINK:
      let navLinks = [...state.navLinks];
      if (navLinks[navLinks.length - 1] !== action.link)
        navLinks.push(action.link);
      return {
        ...state,
        navLinks,
      };

    case actions.REMOVE_LINK:
      let links = [...state.navLinks];
      links.pop();
      return {
        ...state,
        navLinks: links,
      };

    case actions.UPDATE_ITEM_QUANTITY:
      let item = state.items.find((item) => item._id === action.data.itemId);
      item.quantity = action.data.value;
      let storeItems = [...state.items];
      storeItems.forEach((item, id) => {
        if (item._id === action.data.item) storeItems[id] = item;
      });
      return {
        ...state,
        items: storeItems,
      };

    case actions.UPDATE_IMAGE:
      return {
        ...state,
        loading: true,
      };

    case actions.UPDATE_IMAGE_SUCCESS:
      let imageItem = state.items.find((item) => item._id === action.data._id);
      imageItem = action.data;
      let imageItems = [...state.items];
      imageItems.forEach((item, id) => {
        if (imageItem._id === action.data) imageItems[id] = imageItem;
      });
      return {
        ...state,
        loading: false,
        items: imageItems,
      };

    case actions.UPDATE_IMAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
