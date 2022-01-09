import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from '../../redux/services/api';

export default function ProductList() {
  const products = useSelector((state) => state?.productSlice?.products);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row?.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        getRowId={row => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
