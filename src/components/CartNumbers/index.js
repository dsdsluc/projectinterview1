import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
function CartNumbers (){
    const cart = useSelector(state => state.CartReducer);
    const totalItemCart = cart.reduce((total, item)=>{
      return (total + item.quanity);
    }, 0)

    return(
        <>
            <Link to={"/cart"}>
            <Button danger="true" size="large" icon={<ShoppingCartOutlined />}>
              Giỏ hàng ({totalItemCart})
            </Button>
          </Link>
        </>
    )
}
export default CartNumbers;