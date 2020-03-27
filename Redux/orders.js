import * as ActionTypes from "./ActionTypes";
export const orders = (
  state = {
    isLoading: true,
    errMessage: null,
    orders: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        isLoading: false,
        errMessage: null,
        orders: action.payload
      };

    case ActionTypes.ORDER_FAILED:
      return { ...state, isLoading: false, errMessage: action.payload };

    case ActionTypes.ORDER_LOADING:
      return { ...state, isLoading: true, errMessage: null, orders: [] };

    default:
      return state;
  }
};
