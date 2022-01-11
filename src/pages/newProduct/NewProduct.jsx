import { useState } from "react";
import "./newProduct.css";
import app from '../../firebase';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addProduct } from '../../redux/services/api';
import { useDispatch } from 'react-redux';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState();
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

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
    event.preventDefault();
    const fileName = new Date().getTime() + imgFile.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Some Error');
            break;
        }
      },
      (error) => {
        console.log("Error in file upload with error", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: category };
          addProduct(product, dispatch);
        });
      }
    );
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(event) => setImgFile(event.target.files[0])} />
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
