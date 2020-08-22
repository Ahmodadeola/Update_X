import * as actions from "../actions";

const init_state = {
  category: [],
  loading: false,
  error: false,
};
const updateCategories = (categories, category) => {
  return [...categories, category];
};

const categoryReducer = (state = init_state, action) => {
  switch (action.type) {
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

    case actions.ADD_CATEGORY:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: updateCategories(state.category, action.category),
      };

    case actions.ADD_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default categoryReducer;
