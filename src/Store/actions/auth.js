import * as Action from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type : Action.AUTH_START
    }
}

export const authSuccess = (token, localId) => {
    return {
        type: Action.AUTH_SUCCESS,
        token: token,
        localId: localId
    }
}

export const authFailure = error => {
    return {
        type: Action.AUTH_FAILURE,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
    return {
        type: Action.AUTH_LOGOUT
    }
}

const checkSessionExpiration = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    }
}
export const auth = (email, password,isSignUp) => {
    return dispatch => {
         dispatch(authStart());
         const authData = {
             email: email,
             password: password,
             returnSecureToken: true
         };
         
         let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBw9vVIXU8I33thp10vsu6vG5Vb7BD06XA" // For new users
         if(isSignUp) url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw9vVIXU8I33thp10vsu6vG5Vb7BD06XA"; // For existing users
        
         axios.post(url,authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expireDate)
                localStorage.setItem('userId',response.data.localId)
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(checkSessionExpiration(response.data.expiresIn))
            })
            .catch(error => dispatch(authFailure(error.response.data.error)));        
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: Action.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkSessionExpiration((expirationDate.getTime() - new Date().getTime()/1000)));
            }
        }
    }
}