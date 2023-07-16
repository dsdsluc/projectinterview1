import { Button } from "antd";
import ProductList from "../../components/ProductList";
import ProductPagination from "../../components/ProductPagination";
import { useState } from "react";
import "./Home.css"

function Home() {
  const [state, setState] = useState(true);
  const handleState = () => {
    setState(!state);
  };

  return (
    <>
      <div className="show-mode">
        {state === true ? (
          <Button onClick={handleState}>Show All</Button>
        ) : (
          <Button onClick={handleState}>Show Pagination</Button>
        )}
      </div>
      {state === true ? <ProductPagination /> : <ProductList />}
    </>
  );
}
export default Home;
