import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from "react";
import { userRequest } from '../../requestMethod'
import { updateProduct } from "../../redux/services/api";

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], []);

  const product = useSelector((state) => (
    state.productSlice.products.find((product) => product?._id == productId)
  ))

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`order/income?prodId=${productId}`);
        res.data.map((value) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[value._id - 1], Sales: value.total }
          ])
        )
      } catch (err) {
        console.log("ERROR while fetching product stats with err msg", err.msg);
      }
    }
    getStats();
  }, [MONTHS]);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    setInputs(prev => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(productId, inputs, dispatch);
  }

  const [prodStats, setProdStats] = useState([]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={prodStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id: </span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">{product?.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product?.title} name="title" onChange={handleChange} />
            <label>Product Description</label>
            <input type="text" placeholder={product?.desc} name="desc" onChange={handleChange} />
            <label>Price</label>
            <input type="text" placeholder={product?.price} name="price" onChange={handleChange} />
            <label>In Stock</label>
            <select name="inStock" id="idStock" name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button className="productButton" onClick={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
