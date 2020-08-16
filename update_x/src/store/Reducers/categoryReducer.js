import * as actions from "../actions";

const init_state = {
  category: [],
  loading: false,
  error: false,
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

    default:
      return state;
  }
};

export default categoryReducer;
