export const FinshReducer = (state = false, action)=>{
    switch (action.type) {
        case "FINSH_CART":
            return action.finsh;
    
        default:
            return state
    }
}