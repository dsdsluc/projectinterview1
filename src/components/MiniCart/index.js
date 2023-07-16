import { useDispatch, useSelector } from "react-redux";
import "./MiniCart.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, MinusOutlined, DeleteOutlined , LoginOutlined} from "@ant-design/icons"
import { deleteItem, updateItem } from "../../action/Cart";
import Payment from "../Payment";
function MiniCart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.CartReducer);
  const finsh = useSelector(state => state.FinshReducer);

  const totalMoney = cart.reduce((total, item) => {
    const newPrice = (
      item.infor.price -
      (item.infor.price * item.infor.discountPercentage) / 100
    ).toFixed(0);
    return total + item.quanity * newPrice;
  }, 0);
  const handleUp = (id)=>{
    dispatch(updateItem(id, 1));
  }
  const handleDown = (id)=>{
    const itemUpdate = cart.find(item=>item.id===id);
    if(itemUpdate.quanity > 1){
      dispatch(updateItem(id, -1));
    }
  }
  const handleDelete = (id)=>{
    dispatch(deleteItem(id));
  }
  
  return (
    <>
      {cart.length > 0 ? (
        <div className="cart">
          <div className="cart__back" >
            <Link to={"/"}>
              <Button icon={<HomeOutlined />} >Quay trở lại mua hàng</Button>
            </Link>
          </div>
          {cart.map((item) => (
            <div className="cart__item" key={item.id}>
              <div className="cart__image">
                <img src={item.infor.thumbnail} alt={item.infor.title} />
              </div>
              <div className="cart__infor">
                <h3 className="cart__title">{item.infor.title}</h3>
                <div className="cart__meta">
                  <div className="cart__decs">
                    Mo ta: {item.infor.description}
                  </div>
                  <div className="cart__price--new">
                    Gia :
                    {(
                      item.infor.price -
                      (item.infor.price * item.infor.discountPercentage) / 100
                    ).toFixed(0)}
                    $ <span>( -{item.infor.discountPercentage}%)</span>
                  </div>
                  <div className="cart__price--old">{item.infor.price}$</div>
                </div>
              </div>
              <div className="cart__quanity">
                <p>So Luong: {item.quanity}</p>
              </div>
              <div className="cart__button">
                <Button onClick={()=>handleUp(item.id)} icon={<PlusCircleOutlined />}></Button>
                <Button onClick={()=>handleDown(item.id)} icon={<MinusOutlined />}></Button>
              </div>
              <div className="cart__delete">
                <Button onClick={()=>handleDelete(item.id)} icon = {<DeleteOutlined />}></Button>
              </div>
            </div>
          ))}
          <div className="cart__total">
            <p>
              Tổng cộng : <span>{totalMoney}$</span>{" "}
            </p>
          </div>
          <div className="cart__pay">
            <Button icon ={<LoginOutlined />} size="normal" type="primary">Login to pay  </Button>
             <Payment/>
            </div>
        </div>
      ) : (
        <div className="cart">
            <div className="cart__back">
            <Link to={"/"}>
              <Button icon={<HomeOutlined />}>Quay trở lại mua hàng</Button>
            </Link>
          </div>
          {finsh ===true ? (
            <h3 className="cart__finsh">Cảm ơn bạn đã mua sản phẩm của cửa hàng!</h3>
          ):(
             <h3>Hiện tại không có sản phẩm nào trong giỏ hàng!</h3>
          )}
         
        </div>
      )}
    </>
  );
}
export default MiniCart;
