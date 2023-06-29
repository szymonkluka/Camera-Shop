const initialState = {
    products: [],
    cartItems: [],
};

const addItems = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDITEM': {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
            }
        }
        case 'DELITEM': {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    return {
                        ...state,
                        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
                    };
                } else {
                    return {
                        ...state,
                        cartItems: state.cartItems.map((item) =>
                            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                }
            }
            return state;
        }

        case 'FETCH_IMAGES': {
            return { ...state, images: action.payload }; // Store the fetched images in the state
        }


        case 'FETCH_PRODUCTS':
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

export default addItems;