import axios from "../../helper/axios";
import { categoryConstansts } from "./constant";

export const getAllCategory = () => async dispatch => {

    dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST })
    const res = await axios.get('/category/getAllCategory')
    const { categories } = res.data;
        // console.log('category===',res)
    if (res.status === 200) {
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
            payload: { categoryList: categories }
        })
    } else {
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
            payload: { error: res.data.error }
        })
    }
}

export const addCategory = (form) => async dispatch => {
    dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST
    })
    const res = await axios.post('/category/createCategory', form)
    if (res.status === 201) {
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
            payload: {
                category: res.data.category
            }
        })
    } else {
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
            payload: res.data.error
        })
    }
}