import { get } from "../utils/request";

export const getProductList = async ()=>{
    const response = await get("products");
    return response;
}
export const getProductItem = async (id)=>{
    const response = await get(`products/${id}`);
    return response;
}
export const getProductSlide = async (page)=>{
    const response = await get(`products?_page=${page}&_limit=9`);
    return response;
}
export const getProductFilter = async (param)=>{
    const response = await get(`products?category=${param}`);
    return response;
}