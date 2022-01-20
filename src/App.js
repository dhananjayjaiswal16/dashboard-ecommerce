import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector(state => state?.userSlice?.currentUser?.token);
  return (
    <Router>
      <Switch>
        {token ?
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
              <Route path="/order/:orderId">
                <Order />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Redirect to='/' />
            </div>
          </> : <><Route path="/login"><Login /></Route><Redirect to='/login' /></>
        }
      </Switch>
    </Router>
  );
}

export default App;
