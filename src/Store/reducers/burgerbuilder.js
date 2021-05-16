import * as Action from '../actions/actionTypes';
import {update} from '../utitlity';
const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Action.ADD_INGREDIENT: return addIngredient(state,action);
        case Action.REMOVE_INGREDIENT:return removeIngredient(state, action);
        case Action.SET_INGREDIENT: return setIngredient(state, action);
        case Action.FETCH_FAILED: return fetchFailed(state,action);
        default: return state;
    }
};

const addIngredient = (state,action) => {
    const updatedIngredients = update(
        state.ingredients,
        {
            [action.ingredient] : state.ingredients[action.ingredient] + 1
        });
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + Action.INGREDIENT_PRICES[action.ingredient]
        }
        return update(state, updatedState);
}
const removeIngredient = (state,action) => {
    const updatedIngredients = update(
        state.ingredients,
        {
            [action.ingredient] : state.ingredients[action.ingredient] - 1
        });
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - Action.INGREDIENT_PRICES[action.ingredient]
        }
        return update(state, updatedState);
}

const setIngredient = (state, action) => {
    return update(state,{
        ingredients : action.ingredient,
        error: false,
        totalPrice: 0
    })
}

const fetchFailed = (state, action) => {
    return update(state,{error: true});
}

export default reducer;