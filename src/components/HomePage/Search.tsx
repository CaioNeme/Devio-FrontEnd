import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function Search(): React.ReactElement {
  const [results, setResults] = React.useState({});
  const [product, setProduct] = React.useState({
    product: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newProduct = { ...product };
    newProduct[event.target.name] = event.target.value;
    setProduct(newProduct);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product.product) {
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${product.product}`)
      .then(res => {
        setResults(res.data);
      })
      .catch(error => console.log(error));

    setProduct({ product: '' });
  }

  useEffect(() => {}, [results]);

  return (
    <LookOut onSubmit={event => handleSubmit(event)}>
      <h1>Seja bem-vindo!</h1>
      <input
        autoComplete="off"
        type="text"
        placeholder="O que você procura?"
        onChange={event => handleChange(event)}
        name="product"
        value={product.product}
      />
    </LookOut>
  );
}

const LookOut = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;

  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    font-family: 'Poppins';
    margin-bottom: 10px;
  }

  input {
    width: 300px;
    height: 40px;
    background: #f4f4f4;
    border: 0;
    border-radius: 8px;
    padding-left: 10px;
    margin-bottom: 10px;
    font-family: 'Poppins';
    font-size: 14px;
    font-weight: 400;
  }
  input:focus,
  select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  @media screen and (max-width: 444px) {
    align-items: center;
    justify-content: center;

    input {
      box-sizing: border-box;
      width: 200px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;
