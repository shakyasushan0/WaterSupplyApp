import * as ActionTypes from "./ActionTypes";
import Fire from "../FIre";

export const fetchOrders = () => dispatch => {
  dispatch(orderLoading());

  return Fire.shared.firestore
    .collection("orders")
    .where(id, "==", Fire.shared.uid)
    .onSnapshot(querySnapshot => {
      const orders = [];
      querySnapshot.forEach(doc => {
        const {
          address,
          amount,
          contact,
          customer,
          date,
          order,
          status,
          time
        } = doc.data();
        orders.push({
          id: doc.id,
          address,
          amount,
          contact,
          customer,
          date,
          order,
          status,
          time
        });
      });
      dispatch(addOrders(orders));
    })
    .catch(err => dispatch(orderFailed(err.message)));
};

export const orderLoading = () => ({
  type: ActionTypes.ORDER_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.ORDER_FAILED,
  payload: errmess
});

export const addDishes = orders => ({
  type: ActionTypes.ADD_ORDER,
  payload: orders
});
