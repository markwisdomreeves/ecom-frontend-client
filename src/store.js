import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userRegisterReducer, 
    userLoginReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userUpdateReducer,
    userDeleteReducer,
} from "./reducers/userReducers";

import { 
    productListReducer,
    productDetailsReducer,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
    orderPayReducer,
} from "./reducers/orderReducers"


const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userLists: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    cart: cartReducer,

});

// STORING THE CARTITEMS DATA IN LOCAL STORAGE
const cartItemsFromStorage = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : []

// STORING THE USER INFO DATA IN LOCAL STORAGE
const userInfoFromStorage = localStorage.getItem('userInfo') 
      ? JSON.parse(localStorage.getItem('userInfo')) 
      : null

// STORING THE SHIPPING ADDRESS DATA IN LOCAL STORAGE
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
      ? JSON.parse(localStorage.getItem('shippingAddress')) 
      : {}


const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage, 
    },
    userLogin: { 
        userInfo: userInfoFromStorage 
    },
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);



export default store;