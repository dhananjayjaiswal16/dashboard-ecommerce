import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { login } from '../../redux/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5fffa;
    /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://s3-pixelphant-frontend.s3.amazonaws.com/frontend/Models-for-your-Product-Photography-best.jpg")
      center; */
  background-size: cover;
`
const Wrapper = styled.div`
    width: 30%;
    `
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Title = styled.h2`
    font-size: 22px;
    font-weight: 500;
`
const Input = styled.input`
    flex: 1;
    margin: 20px 0px 0px;
    padding: 8px;
`
const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
    border: 2px solid #00a7a7;
    background-color: #00a7a7;
    color: white;
    font-weight: 500;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 10px;
    &:disabled{
      cursor: not-allowed;
    }
    &:hover{
        background-color: teal;
        color: #fff;
        border: 2px solid teal;
    }
`
const LinkContainer = styled.div`
    text-align: right;
    margin-top: 8px;
`
const Link = styled.a`
  margin: 0px 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  width: 50%;
`;
const ErrorMsg = styled.div`
  color: red;
  margin-top: 13px;
  width: 210px;
`

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error } = useSelector((state) => state.userSlice);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Login to your account</Title>
          {/* {error && <ErrorMsg>Something went Wrong!!</ErrorMsg>} */}
          <Form>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />

            <Button onClick={handleClick}>Login</Button>
          </Form>

          <LinkContainer>
            <Link side='left'>Forgot Password?</Link>
            <Link side='right'>Don't have an Account?</Link>
          </LinkContainer>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login;
