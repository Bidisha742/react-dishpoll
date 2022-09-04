export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export const loginAction = (payload) => {
    return {
        type: LOGIN_ACTION,
        payload
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT_ACTION
    }
}