import { loginStart, loginFailure, loginSuccess } from '../userSlice';
import { getProductFailure, getProductStart, getProductSuccess, deleteProductStart, deleteProductFailure, deleteProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess, addProductFailure, addProductStart, addProductSuccess } from '../productSlice';
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
    const res = await userRequest.put(`/product/${id}`);
    dispatch(updateProductSuccess({ id, product }));
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