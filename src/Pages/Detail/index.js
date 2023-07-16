import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductItem } from "../../services/ProductServices";
import {  Button, Image } from "antd";
import "./Detail.scss"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItem } from "../../action/Cart";

function Detail() {
  const param = useParams();
  const [data, setData] = useState();
  const cart = useSelector(state=>state.CartReducer);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductItem(param.id);
      setData(response);
    };
    fetchApi();
  }, [param.id]);
  const handleAddToCart = (id, item)=>{
    const exitsItem = cart.some(item=>(item.id === id));
    if(exitsItem){
        dispatch(updateItem(id,1))
    }
    else {
        dispatch(addToCart(id,1,item))
    }
  }
  return (
    <>
      {data ? (
        <div className="productDetail">
          <div className="detail__title">
            <h2>Chi tiet ve san pham: {data.title}</h2>
          </div>
          <div className="productDetail__top">
            <div className="productDetail__image">
              <img src={data.thumbnail} alt={data.title}/>
            </div>
            <div className="productDetail__infor">
              <div className="productDetail__title">{data.title}</div>
              <div className="productDetail__decs">{data.description}</div>
              <div className="productDetail__price--new">
                <span>Giá: </span>
                {(
                  data.price -
                  (data.discountPercentage * data.price) / 100
                ).toFixed(0)}
                $
              </div>
              <div className="productDetail__price--old">{data.price}$</div>
            </div>
            <div>
                <Button danger onClick={()=>handleAddToCart(data.id, data)}>Thêm vào giỏ hàng</Button>
            </div>
          </div>
          <div className="productDetail__bottom">
            {data.images.map((item, index) => (
              <Image src={item} key={index} width={200} />
            ))}
          </div>
        </div>
      ) : (
        <>Dang load du lieu</>
      )}
    </>
  );
}
export default Detail;
