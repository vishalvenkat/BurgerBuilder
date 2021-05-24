import * as Action from '../actions/actionTypes';
import {update} from '../utitlity';
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Action.AUTH_START: return authStart(state);
        case Action.AUTH_SUCCESS: return authSuccess(state,action);
        case Action.AUTH_FAILURE: return authFailure(state,action);
        case Action.AUTH_LOGOUT: return authLogout(state);
        case Action.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state;
    }
}

const authSuccess = (state,action) => {
    return update(state, {loading: false, token: action.token, userId: action.localId})
}
const authFailure = (state,action) => {
    return update(state, {loading: false, error: action.error})
}
const authStart = state => {
    return update(state, {loading: true, error: null})
}
const authLogout = state => {
    return update(state,{token: null,userId: null});
}
const setAuthRedirectPath = (state, action) => {
    return update(state, {authRedirectPath: action.path})
}
export default reducer;