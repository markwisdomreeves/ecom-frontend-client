import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
} from "../constants/userConstants";

import {
    ORDER_LIST_MY_RESET
} from "../constants/orderConstants"

import axios from "axios";

import api from "../API";



// USER REGISTER
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `${api.apiUrl}/users`,
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        // LOGIN THE USER AS SOON AS THEY REGISTER
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// LOGOUT USER ACTION
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
}
  

// USER LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ 
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `${api.apiUrl}/users/login`,
           {email, password}, 
         config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// GET SINGLE USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: USER_DETAILS_REQUEST,
        });

        // WE ARE GETTING THE USER TOKEN FRON ON THE userInfo object
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${api.apiUrl}/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

// UPDATE SINGLE USER PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        // WE ARE GETTING THE USER TOKEN FRON ON THE userInfo object
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`${api.apiUrl}/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        // THE USER LOGIN AND REGISTER INFO SHOULD ALSO BE UPDATED
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        }); 
        
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

// LIST ALL USERS DETAILS ACTION
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: USER_LIST_REQUEST,
        });

        // WE ARE GETTING THE USER TOKEN FRON ON THE userInfo object
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${api.apiUrl}/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        })
    }
}

// UPDATE SINGLE USER DETAILS
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: USER_UPDATE_REQUEST,
        });

        // WE ARE GETTING THE USER TOKEN FRON ON THE userInfo object
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`${api.apiUrl}/users/${user._id}`, user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_DETAILS_RESET,
        });

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        })
    }
}

// DELETE ALL USERS DETAILS ACTION
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: USER_DELETE_REQUEST,
        });

        // WE ARE GETTING THE USER TOKEN FRON ON THE userInfo object
        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${api.apiUrl}/users/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
        });

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        })
    }
}
