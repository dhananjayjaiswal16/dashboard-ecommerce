import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteOrder, getOrders } from "../../redux/services/api";
import { useDispatch, useSelector } from "react-redux";

export default function OrderList() {
  const orders = useSelector((state) => state?.orderSlice?.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrders(dispatch);
  }, []);

  const handleDelete = (id) => {
    console.log("row._id delete order", id);
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "Order ID", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="userListEdit">View Order Detail</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        getRowId={row => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
