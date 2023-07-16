import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./SearchProduct.scss";

import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getProductSlide } from "../../services/ProductServices";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateItem } from "../../action/Cart";
import { finshCart } from "../../action/Finsh";
import { Link } from "react-router-dom";

const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<button class="' + className + '">' + (index + 1) + "</button>";
  },
};
function ProductPagination() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const productSlide = [];
      for (let index = 1; index <= 4; index++) {
        const response = await getProductSlide(index);
        productSlide.push(response);
      }
      setData(productSlide);
    };
    fetchApi();
  }, []);
  const handleClick = (id, i) => {
    const existItem = cart.some((item) => item.id === id);
    if (existItem) {
      dispatch(updateItem(id, 1));
    } else {
      dispatch(addToCart(id, 1, i));
      dispatch(finshCart(false));
    }
  };

  return (
    <>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div className="slider">
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="productSlider">
                  {item.map((i, inde) => (
                    <div className="productSlider__item" key={inde}>
                      <div className="productSlider__detail">
                        <Link to={"/detail/" + i.id}>
                          <Button type="primary" size="large">
                            Xem chi tiet
                          </Button>
                        </Link>
                      </div>
                      <div className="productSlider__image">
                        <img src={i.thumbnail} alt={i.title} />
                      </div>
                      <div className="productSlider__infor">
                        <div className="productSlider__title">{i.title}</div>
                        <div className="productSlider__price--new">
                          <span>Gia moi: </span>
                          {(
                            i.price -
                            (i.price * i.discountPercentage) / 100
                          ).toFixed(0)}
                          $<span>(-{i.discountPercentage}%)</span>
                        </div>
                        <div className="productSlider__price--old">
                          {i.price}$
                        </div>
                      </div>
                      <div className="productSlider__button">
                        <Button danger onClick={() => handleClick(i.id, i)}>
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
}
export default ProductPagination;
