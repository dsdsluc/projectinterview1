export const addToCart = (id, quanity, infor)=>{
    return{
        type: "ADD_TO_CART",
        quanity: quanity,
        id: id,
        infor: infor
    }
}
export const updateItem = (id, step)=>{
    return{
        type: "UPDATE_ITEM",
        id: id,
        step : step
        
    }
}
export const deleteItem = (id)=>{
    return{
        type: "DEL_ITEM",
        id: id,
        
    }
}
export const deleteAllItem = ()=>{
    return{
        type: "DEL_ALL_ITEM",
        
    }
}
