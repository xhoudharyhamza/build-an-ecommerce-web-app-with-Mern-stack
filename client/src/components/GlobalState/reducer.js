// create reducer function
let reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: action.payload,
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: action.payload,
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_FEATURE_PRODUCTS":
      return {
        ...state,
        featureProducts: action.payload,
      };
    default:
      return {
        ...state,
      };
      break;
  }
};
export default reducer;
