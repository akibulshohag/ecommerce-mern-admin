import axios from "../../helper/axios";
import { categoryConstansts, productConstants } from "./constant";


export const getIntialData = () => {
    return async dispatch => {

        const res = await axios.post('/initialData');
        if (res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categoryList: categories }
            });
            dispatch({
                type:productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products}
            });
        }
        console.log(res);
    }
}