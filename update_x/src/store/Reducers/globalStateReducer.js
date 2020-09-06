import * as actions from "../actions";

const init_state = {
  searchMode: false,
  navLinks: ["/"],
  links: [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Category", path: "/category", icon: "list-alt" },
    { name: "Items", path: "/all-items", icon: "store" },
    { name: "New Category", path: "/add-category", icon: "plus" },
    { name: "New Item", path: "/add-item", icon: "plus" },
    { name: "Transactions History", path: "/history", icon: "history" },
    { name: "Vendors", path: "/vendors", icon: "people-arrows" },
    { name: "Return Item(s)", path: "/return-item", icon: "times" },
    {
      name: "Incoming",
      path: "/incoming",
      icon: "truck-pickup",
    },
    { name: "Items Stats", path: "/stat", icon: "chart-bar" },
  ],
};

const globalStateReducer = (state = init_state, action) => {
  switch (action.type) {
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

    case actions.SET_ERROR:
      return {
        ...state,
        error: true,
      };

    case actions.REMOVE_ERROR:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export default globalStateReducer;
