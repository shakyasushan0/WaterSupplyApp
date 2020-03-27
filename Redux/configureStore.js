import { createStore, combineReducers } from "redux";
import { orders } from "./orders";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      orders
    })
  );

  return store;
};
