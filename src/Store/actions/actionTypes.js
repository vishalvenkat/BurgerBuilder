/**
 * Burger Builder
 */

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const FETCH_FAILED = 'FETCH_FAILED';

/**
 * Checkout
 */

export const BURGER_PURCHASE_SUCCESS = 'BURGER_PURCHASE_SUCCESS';
export const BURGER_PURCHASE_FAILURE = 'BURGER_PURCHASE_FAILURE';
export const BURGER_PURCHASE_START = 'BURGER_PURCHASE_START';
export const BURGER_PURCHASED = 'BURGER_PURCHASED';

/**
 *  Orders
 */

 export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
 export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
 export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

/**
 * Authentication
 */

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}