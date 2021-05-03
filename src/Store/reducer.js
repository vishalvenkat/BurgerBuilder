import * as Action from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Action.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient] : state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + Action.INGREDIENT_PRICES[action.ingredient]
            };
        case Action.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient] : state.ingredients[action.ingredient] > 0 ?state.ingredients[action.ingredient] - 1 : 0
                },
                totalPrice: state.totalPrice - Action.INGREDIENT_PRICES[action.ingredient]
            };
        default: return state;
    }
};
export default reducer;