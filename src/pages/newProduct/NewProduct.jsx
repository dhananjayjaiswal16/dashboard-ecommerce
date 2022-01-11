import { useState } from "react";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState();
  const [category, setCategory] = useState();

  const handleChange = (event) => {
    setInputs(prev => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  const handleCategoryChange = (event) => {
    // console.log(event.target.value);
    setCategory(event.target.value.split(','));
  }
  const handleSubmit = (event) => {
    e.preventDefault();
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(event) => setImgFile(event.target.files)[0]} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="iPhone 13 Pro Max" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem" >
          <label>Category</label>
          <input type="text" placeholder="jeans,shirt" onChange={handleCategoryChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Product Descripiton..." name="desc" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="2000" name="price" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="" id="" name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
