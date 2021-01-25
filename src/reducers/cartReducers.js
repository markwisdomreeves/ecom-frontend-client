import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    SAVE_CART_SHIPPING_ADDRESS,
    SAVE_CART_PAYMENT_METHOD,
    CLEAR_CART_ITEMS,
} from "../constants/cartConstants";



export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {

    switch(action.type) {

        // ADD CART ITEM REDUCER
        case ADD_CART_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }


        // REMOVE CART ITEM REDUCER  
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
        // SAVE CART SHIPPING ADDRESS REDUCER 
        case SAVE_CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        // SAVE CART PAYMENT METHOD REDUCER 
        case SAVE_CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        // CLEAR ALL CART ITEM REDUCER 
        case CLEAR_CART_ITEMS:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state
    }
}