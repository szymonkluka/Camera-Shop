import axios from 'axios';

export const addItem = (product) => {
    return (dispatch, getState) => {
        // Dispatch the action to add the item to the Redux store
        dispatch({
            type: "ADDITEM",
            payload: product,
        });

        // Get the updated cartItems array from the Redux store state
        const updatedCartItems = getState().addItem.cartItems;

        // Save the updated cartItems array to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
};

export const delItem = (product) => {
    return (dispatch, getState) => {
        // Dispatch the action to remove the item from the Redux store
        dispatch({
            type: "DELITEM",
            payload: product,
        });

        // Get the updated cartItems array from the Redux store state
        const updatedCartItems = getState().addItem.cartItems;

        // Save the updated cartItems array to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
};

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/products')
            dispatch({
                type: 'FETCH_PRODUCTS',
                payload: response.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}


export const fetchImages = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/images');
            const images = response.data; // Assuming the response data is an array of image URLs
            dispatch({
                type: 'FETCH_IMAGES',
                payload: images,
            });
        } catch (error) {
            console.log(error);
        }
    };
};