

export const CartReducer = (state = [], action)=>{
    let initState=[
        ...state,
    ]
    switch (action.type) {
        case "ADD_TO_CART":
            initState = [
                ...state,
                {
                    id: action.id,
                    quanity: action.quanity,
                    infor: action.infor
                }
            ]
            return initState;
        case "UPDATE_ITEM":
            const indexItem = initState.findIndex(item=>(item.id === action.id));
            initState[indexItem].quanity += action.step; 
            return initState;
        case "DEL_ITEM":
            initState = initState.filter(item=>item.id !== action.id)
            return initState;
        case "DEL_ALL_ITEM":
            return [];
        default:
            return state;
    }
    
}