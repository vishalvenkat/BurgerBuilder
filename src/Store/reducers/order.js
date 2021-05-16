import * as Action from '../actions/actionTypes';
import {update} from '../utitlity';

const intitalState = {
    orders: [],
    loading: false,
    isPurchased: false
}


const reducer = (state=intitalState, action) => {
    switch(action.type) {
        case Action.BURGER_PURCHASE_SUCCESS: return burgerPurchaseSuccess(state,action)
        case Action.BURGER_PURCHASE_FAILURE: return burgerPurchaseFailure(state,action)
        case Action.BURGER_PURCHASE_START: return burgerPurchaseStart(state,action)
        case Action.BURGER_PURCHASED: return burgerPurchased(state,action)
        case Action.FETCH_ORDERS_START: return fetchOrderStart(state,action)
        case Action.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state,action)
        case Action.FETCH_ORDERS_FAILURE: return fetchOrderFailure(state,action)
        default: return state;
    }
}



const burgerPurchaseSuccess = (state,action) => {
    const order = update(action.orderData,{id: action.orderId});
            return update(state, {orders: state.orders.concat(order),loading: false,isPurchased: true})
}
const burgerPurchaseFailure = (state,action) => {
    return update(state,{
        loading: false,
        isPurchased: true
    })
}
const burgerPurchaseStart = (state,action) => {
    return update(state,{
        loading: true
    })
}
const burgerPurchased = (state,action) => {
    return update(state,{isPurchased: false})
}
const fetchOrderStart = (state,action) => {
    return update(state,{
        loading: true
    })
}
const fetchOrderSuccess = (state,action) => {
    return update(state,{
        orders: action.orders,
        loading: false
    })
}
const fetchOrderFailure = (state,action) => {
    return update(state,{
        loading: false
    })
}


export default reducer;