import { 
    ADD_CART_ITEM, 
    REMOVE_CART_ITEM,
    SAVE_CART_SHIPPING_ADDRESS,
    SAVE_CART_PAYMENT_METHOD,
} from "../constants/cartConstants";

import axios from "axios";

import api from "../API"


// GET AND ADD CART
export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`${api.apiUrl}/products/${id}`);

    dispatch({
        type: ADD_CART_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// REMOVE CART ITEMS
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: SAVE_CART_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_CART_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}



