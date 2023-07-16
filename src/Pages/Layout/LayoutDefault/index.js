import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../image/logo.jpg";
import CartNumbers from "../../../components/CartNumbers";
import { useDispatch } from "react-redux";
import { finshCart } from "../../../action/Finsh";
import "./layout.scss"

function LayoutDefault() {
  const dispatch = useDispatch()
 const handleFinsh = ()=>{
  dispatch(finshCart(false))
 }
  return (
    <>
      <header className="header">
        <Link to={"/"} onClick={handleFinsh}>
          <div className="header__logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="header__menu">
          <ul className="header__menu--ul">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/laptop"}>Laptop</NavLink>
            </li>
            <li>
              <NavLink to={"fragrances"}>Fragrances</NavLink>
            </li>
            <li>
              <NavLink to={"/skincare"}>Skin-care</NavLink>
            </li>
            <li>
              <NavLink to={"/groceries"}>Groceries</NavLink>
            </li>
            <li>
              <NavLink to={"/home-decoration"}>Home-decoration</NavLink>
            </li>
          </ul>
        </div>
        <div className="header__cart">
          <CartNumbers/>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">Copyright @ HaMinhPhuong</footer>
    </>
  );
}
export default LayoutDefault;
