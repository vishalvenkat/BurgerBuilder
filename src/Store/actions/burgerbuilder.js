import * as Action from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = ingredient => {
    return {
        type:Action.ADD_INGREDIENT, 
        ingredient: ingredient
    }
}

export const removeIngredient = ingredient => {
    return {
        type:Action.REMOVE_INGREDIENT, 
        ingredient: ingredient
    }
}


export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => 
                dispatch(setIngredient(response.data))
            )
            .catch(error => fetchFailed())
        
    }
}

export const setIngredient = (ingredient) => {
    return {
        type: Action.SET_INGREDIENT,
        ingredient: ingredient
    }
}

export const fetchFailed = () => {
    return {
        type: Action.FETCH_FAILED
    }
}

