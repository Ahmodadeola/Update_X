const init_state = {
  globalState: {},
  itemState: {
    items: null,
  },
  categoryState: {},
  vendors: [],

  categoryItems: null,
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
  category: [
    { name: "Books", img: "foods.jpg" },
    { name: "Deodorants", img: "game_console.jpg" },
    { name: "Jewelleries", img: "foods.jpg" },
    { name: "Shoes", img: "foods.jpg" },
    { name: "Groceries", img: "game_console.jpg" },
    { name: "Electronics", img: "game_console.jpg" },
    { name: "Mobile Phones", img: "foods.jpg" },
    { name: "Tablets", img: "game_console.jpg" },
    { name: "Laptops", img: "foods.jpg" },
    { name: "Home Gadgets", img: "game_console.jpg" },
  ],
};
export default init_state;
