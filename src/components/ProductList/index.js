import { getProductList } from "../../services/ProductServices";
import { useEffect, useState } from "react";
import "./ProductList.scss";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItem } from "../../action/Cart";
import { finshCart } from "../../action/Finsh";
import { Link } from "react-router-dom";
function ProductList() {
    const cart = useSelector(state=>state.CartReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
    const handleAddToCart = (id, item)=>{
        const existItem = cart.some(i=>(i.id === id));
        if(existItem){
            dispatch(updateItem(id,1));
        }
        else{
            dispatch(addToCart(id, 1, item));
            dispatch(finshCart(false))
        }
       
    }

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductList();
      setData(response);
    };   
    fetchApi();
  }, []);
  return (
    <>
      <div className="product">
        {data.map((item,index) => (
            <div className="product__item" key={index}>
              <div className="product__detail">
                <Link to={"/detail/" + item.id}><Button type="primary" size="large">Xem chi tiet</Button></Link>
              </div>
              <div className="product__image">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="product__infor">
                <div className="product__infor--title">{item.title} </div>
                <div className="product__infor--price-new">
                   <span>Price: </span>
                  {(
                    item.price -
                    (item.price * item.discountPercentage) / 100
                  ).toFixed(0)}{" "}
                  $ <span>(-{item.discountPercentage}%)</span>
                </div>
                <div className="product__infor--price-old">{item.price}$</div>
              </div>
              <Button danger onClick={()=>handleAddToCart(item.id, item)}>Thêm vào giỏ hàng</Button>
            </div>
        ))}
      </div>
    </>
  );
}
export default ProductList;
