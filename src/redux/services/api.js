import { loginStart, loginFailure, loginSuccess } from '../userSlice';
import { getProductFailure, getProductStart, getProductSuccess, deleteProductStart, deleteProductFailure, deleteProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess, addProductFailure, addProductStart, addProductSuccess } from '../productSlice';
import { getOrderStart, getOrderFailure, getOrderSuccess, deleteOrderFailure, deleteOrderStart, deleteOrderSuccess } from '../orderSlice';
import { getUserFailure, getUserStart, getUserSuccess, deleteUserSuccess, deleteUserFailure, deleteUserStart } from '../allUsersSlice';
import { publicRequest, userRequest } from '../../requestMethod';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/product');
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure(err));
  }
}

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure(err));
  }
}

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    console.log("product in update pro", product);
    const res = await userRequest.put(`/product/${id}`, product);
    const updatedProd = res.data;
    dispatch(updateProductSuccess({ id, updatedProd }));
  } catch (err) {
    dispatch(updateProductFailure(err));
  }
}

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure(err));
  }
}


export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get('/order');
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure(err.message));
  }
}

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/order/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure(err.message));
  }
}

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get('/user');
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure(err.message));
  }
}

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure(err.message));
  }
}