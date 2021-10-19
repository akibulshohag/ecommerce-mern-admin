import { productConstants } from "../action/constant";

const initialData = {
    products: []
};

export default (state = initialData, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}