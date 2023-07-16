import { useEffect, useState } from "react";
import { getProductFilter } from "../../services/ProductServices";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItem } from "../../action/Cart";

function HomeDecoration() {
  const param = "home-decoration";
  const cart = useSelector(state => state.CartReducer);
  const dispatch = useDispatch()
  console.log(cart)
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductFilter(param);
      setData(response);
    };
    fetchApi();
  }, []);
  const handleAddToCart = (id, item)=>{
    const existItem = cart.some(item=>(item.id ===id));
    if(existItem === true){
        dispatch(updateItem(id, 1));
    }
    else{
        dispatch(addToCart(id,1,item));
    }
  }
  return (
    <>
      {data.length > 0 ? (
        <div className="product">
          {data.map((item) => (
            <div className="product__item" key={item.id}>
              <div className="product__detail">
                <Link to={"/detail/" + item.id}>
                  <Button type="primary" size="large">
                    Xem chi tiet
                  </Button>
                </Link>
              </div>
              <div className="product__image">
                <img src={item.thumbnail} alt={item.title}></img>
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
              <Button danger  onClick={() => handleAddToCart(item.id, item)}>
                Thêm vào giỏ hàng
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <>Đang load dữ liệu</>
      )}
    </>
  );
}
export default HomeDecoration;
