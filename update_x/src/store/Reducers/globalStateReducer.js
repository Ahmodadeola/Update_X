import * as actions from "../actions";

const init_state = {
  searchMode: false,
  navLinks: ["/"],
  links: [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Category", path: "/category", icon: "list-alt" },
    { name: "All Items", path: "/all-items", icon: "shopping-cart" },
    { name: "Transactions History", path: "/history", icon: "history" },
    { name: "Vendors", path: "/vendors", icon: "shopping-cart" },
    { name: "Add/Remove Item(s)", path: "/add-item", icon: "shopping-cart" },
    { name: "Add New Category", path: "/add-category", icon: "shopping-cart" },
    { name: "Return Item(s)", path: "/return-item", icon: "shopping-cart" },
    {
      name: "Expected Supply",
      path: "/expected-supply",
      icon: "shopping-cart",
    },
    { name: "Items Stats", path: "/stat", icon: "shopping-cart" },
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

    default:
      return state;
  }
};

export default globalStateReducer;
