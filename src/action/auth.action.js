import axios from "../helper/axios";
import { authConstant } from "./constant"

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST });
        const res = await axios.post('/adminLogin', {
            ...user
        })
        if (res.status === 200) {
            localStorage.setItem('token', res?.data?.access_token);
            localStorage.setItem('user', JSON.stringify(res?.data));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    data: res.data
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstant.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload: {
                    data: user
                }
            });
        } else {
            dispatch({
                type: authConstant.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: authConstant.LOGOUT_REQUEST,
        });
        const res = await axios.post('/adminLogout');

        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstant.LOGOUT_SUCCESS,
            });
        } else {
            dispatch({
                type: authConstant.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}