import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ProductList from '../components/HomePage/ProductList';
import Search from '../components/HomePage/Search';
import { ItensToRequest } from '../utils/protocols';

export default function HomePage(): React.ReactElement {
  const [products, setProducts] = useState([]);
  const [itens, setItens] = useState([]);
  const [itensIds, setItensIds] = useState([]);
  const [productsIds, setProductsIds] = useState([]);
  const navigate = useNavigate();
  const burguerRef = useRef(null);
  const drinkRef = useRef(null);
  const dessertRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  function scrollToRef(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function fetchProducts() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function cancelOrder() {
    setItens([]);
    setItensIds([]);
    setProductsIds([]);
    setProducts([]);
    navigate('/home');
  }

  function finishOrder() {
    if (itens.length === 0) {
      alert('Selecione pelo menos um item');
      return;
    }

    const priceTotal = itens.reduce((total, item) => total + item.paidPrice, 0);
    navigate('/payment', {
      state: {
        itens,
        itensIds,
        productsIds,
        priceTotal,
      },
    });
  }

  return (
    <>
      <Header />
      {products.length !== 0 ? (
        <Container>
          <Search />
          <Category>
            <h2>Categorias</h2>
            <p>Navegue por categoria</p>
          </Category>
          <Categories>
            {/* eslint-disable */}
            <div onClick={() => scrollToRef(burguerRef)}>
              <img src='../../public/lanche.png' alt="Lanches" />
              <p>Lanches</p>
            </div>
            <div onClick={() => scrollToRef(drinkRef)}>
              <img src="../../public/bebida.png" alt="Bebidas" />
              <p>Bebidas</p>
            </div>
            <div onClick={() => scrollToRef(dessertRef)}>
              <img src="../../public/sobremesa.png" alt="Sobremesas" />
              <p>Sobremesas</p>
            </div>
            {/* eslint-enable */}
          </Categories>
          <Products>
            <h2>Produtos</h2>
            <p>Selecione um produto para adicionar ao seu pedido</p>
          </Products>
          <div ref={burguerRef}>
            <ProductList
              itens={itens}
              setItens={setItens}
              products={products}
              itensIds={itensIds}
              setItensIds={setItensIds}
              setProductsIds={setProductsIds}
              productsIds={productsIds}
              type="BURGUER"
            />
          </div>
          <div ref={drinkRef}>
            <ProductList
              itens={itens}
              setItens={setItens}
              products={products}
              itensIds={itensIds}
              setItensIds={setItensIds}
              setProductsIds={setProductsIds}
              productsIds={productsIds}
              type="DRINK"
            />
          </div>
          <div ref={dessertRef}>
            <ProductList
              itens={itens}
              setItens={setItens}
              products={products}
              itensIds={itensIds}
              setItensIds={setItensIds}
              setProductsIds={setProductsIds}
              productsIds={productsIds}
              type="DESSERT"
            />
          </div>
          {itens.length !== 0 ? (
            <Resume>
              {itens.map((item: ItensToRequest) => (
                <div>
                  <h1>
                    {item.quantity}x {item.name}
                  </h1>
                  <h1>
                    R$ {(item.paidPrice / 100).toFixed(2).replace('.', ',')}
                  </h1>
                </div>
              ))}
              <span>
                <p>Total do pedido</p>
                <h1>
                  R${' '}
                  {(
                    itens.reduce((total, item) => total + item.paidPrice, 0) /
                    100
                  )
                    .toFixed(2)
                    .replace('.', ',')}
                </h1>
              </span>
            </Resume>
          ) : null}
          <Buttons>
            <button
              disabled={itens.length === 0}
              onClick={cancelOrder}
              type="button"
              style={
                itens.length === 0
                  ? { backgroundColor: '#FFF', color: '#9f9f9f' }
                  : {
                      backgroundColor: '#FFF',
                      color: '#125c13',
                      border: '1px solid #125c13',
                    }
              }
            >
              Cancelar
            </button>
            <button
              disabled={itens.length === 0}
              type="button"
              style={
                itensIds.length === 0
                  ? { backgroundColor: '#9f9f9f', color: '#ffffff' }
                  : { backgroundColor: '#125c13', color: '#ffffff' }
              }
              onClick={finishOrder}
            >
              Finalizar Pedido
            </button>
          </Buttons>
        </Container>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;
  margin: 50px 0 20px 75px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    font-family: 'Poppins';
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    font-family: 'Poppins';
    margin-bottom: 10px;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 250px;
    height: 150px;
    margin-bottom: 50px;

    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.21);
    border-radius: 8px;

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: center;
      font-family: 'Poppins';
      margin-bottom: 10px;
    }

    img {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 444px) {
    flex-direction: column;
  }
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    font-family: 'Poppins';
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    font-family: 'Poppins';
    margin-bottom: 10px;
  }

  @media screen and (max-width: 444px) {
    p {
      width: 200px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;

  width: 100%;

  padding-right: 100px;
  margin-top: 60px;
  margin-bottom: 50px;

  button {
    margin-left: 20px;
    width: 200px;
    height: 50px;

    border-radius: 8px;

    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;

    outline: none;
    border: 1px solid #9f9f9f;

    cursor: pointer;
  }

  @media screen and (max-width: 444px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-right: 0;

    button {
      margin-bottom: 20px;
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 70vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 50px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  font-family: 'Poppins';
  margin-bottom: 10px;
`;

const Resume = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 45px;
  margin-top: 20px;
  width: 90%;
  height: auto;
  border: 1px solid #e2e2e2;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      color: #000;
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }

  span {
    font-family: 'Poppins', sans-serif;
    margin-top: 20px;
    font-size: 18px;
    color: #000;
    margin-left: 20px;
    margin-right: 20px;
    border-top: 2px dashed #000;
    padding-top: 20px;

    h1 {
      font-weight: bold;
      font-size: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
`;
