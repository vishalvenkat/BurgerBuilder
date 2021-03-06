import * as Action from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: Action.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFailure = error => {
    return {
        type: Action.BURGER_PURCHASE_FAILURE,
        error: error
    }
}
export const setLoader = () => {
    return {
        type: Action.BURGER_PURCHASE_START
    };
}
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(setLoader());
        
        axios.post('/orders.json?auth=' + token,orderData)
         .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
         })
         .catch(error => {
             dispatch(purchaseBurgerFailure(error))
         });
    }
}
export const isPurchased = () => {
    return {
        type: Action.BURGER_PURCHASED
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: Action.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFailure = error => {
    return {
        type: Action.FETCH_ORDERS_FAILURE,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: Action.FETCH_ORDERS_START
    }
}
export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json'+ queryParams)
            .then(response => {
                let fetchedData = [];
                for(let key in response.data) {
                    fetchedData.push({
                        id: key,
                        ...response.data[key]
                    })
                }
                dispatch(fetchOrderSuccess(fetchedData))
            })
            .catch(error => {
                dispatch(fetchOrderFailure(error))
            })
    }
}