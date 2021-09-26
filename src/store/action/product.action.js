import axios from "../../helper/axios";

export const addProduct = (form) => async dispatch =>{
    const res = await axios.post('/product/createProduct',form)
    console.log('addProduct===',res);
}

