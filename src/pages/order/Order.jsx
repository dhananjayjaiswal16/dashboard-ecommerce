import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Storefront
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./order.css";
import { getEmailById } from '../../redux/services/api'
import { useEffect } from "react";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split('/')[2];
  const order = useSelector((state) => (
    state.orderSlice.orders.find((order) => order?._id == orderId)
  ))
  // To get user data from state
  const userId = order.userId;
  const user = useSelector((state) => (
    state.allUsersSlice.users.find((user) => user?._id == userId)
  ));
  //to get product data from state
  let productData = order.products.map((product) => {
    const prodId = product.productId
    const singleProduct = useSelector((state) => (
      state.productSlice.products.find((product1) => product1?._id == prodId)
    ));
    const productData = {
      id: singleProduct._id,
      title: singleProduct?.title,
      img: singleProduct?.img,
      quantity: product.quantity
    }
    return productData;
  })
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Order Details</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">Order Id:</span>
              <span className="userShowUserTitle">{order._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Order Details</span>
            {
              productData.map((product) => (
                <div className="userShowInfo">
                  <span className="userShowInfoTitle">{product.title}</span>
                  <img className="userItemImages" src={product.img} alt={`imgOf${product.title}`} />
                  <span className="userShowInfoTitle"><strong>Quantity: </strong> {product.quantity}</span>
                </div>
              ))
            }
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{order.createdAt.slice(0, 10)}</span>
            </div>
            <span className="userShowTitle">User Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{order.address?.line1}, {order.address?.line2} {order.address?.city}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle"><strong>Pin Code: </strong>{order.address?.postal_code}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
