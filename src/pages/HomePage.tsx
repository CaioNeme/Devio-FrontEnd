import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

export default function HomePage(): React.ReactElement {
  const [products, setProducts] = useState([]);

  type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    productType: string;
    soldTimes: number;
    createdAt: string;
    updatedAt: string;
  };

  function fetchProducts() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => {
        setProducts(res.data as Product[]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      {products.length !== 0 ? (
        <Conteiner>
          <Search>
            <h1>Seja bem-vindo!</h1>
            <input type="text" placeholder="O que você procura?" />
          </Search>
          <Category>
            <h2>Catgorias</h2>
            <p>Navegue por categoria</p>
          </Category>
          <Categories>
            <div>
              <img src="/src/assets/images/lanche.png" alt="Lanches" />
              <p>Lanches</p>
            </div>
            <div>
              <img src="/src/assets/images/bebida.png" alt="Bebidas" />
              <p>Bebidas</p>
            </div>
            <div>
              <img src="/src/assets/images/sobremesa.png" alt="Sobremesas" />
              <p>Sobremesas</p>
            </div>
          </Categories>
          <Products>
            <h2>Produtos</h2>
            <p>Selecione um produto para adicionar ao seu pedido</p>
          </Products>
          <ProductsList>
            {products.map(
              product =>
                product.productType === 'BURGUER' && (
                  <Product
                    key={product.id}
                    style={{ backgroundColor: '#f96666' }}
                  >
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h1>{product.name}</h1>
                      <h2>{product.description}</h2>
                      <p>
                        R$ {(product.price / 100).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </Product>
                ),
            )}
          </ProductsList>
          <ProductsList>
            {products.map(
              product =>
                product.productType === 'DRINK' && (
                  <Product style={{ backgroundColor: '#125c13' }}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h1>{product.name}</h1>
                      <h2>{product.description}</h2>
                      <p>
                        R$ {(product.price / 100).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </Product>
                ),
            )}
          </ProductsList>
          <ProductsList>
            {products.map(
              product =>
                product.productType === 'DESSERT' && (
                  <Product style={{ backgroundColor: '#ffeb70' }}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h1>{product.name}</h1>
                      <h2>{product.description}</h2>
                      <p>
                        R$ {(product.price / 100).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </Product>
                ),
            )}
          </ProductsList>
          <Buttons>
            <button
              type="button"
              style={{ backgroundColor: '#ffffff', color: '#9f9f9f' }}
            >
              Cancelar
            </button>
            <button
              type="button"
              style={{ backgroundColor: '#9f9f9f', color: '#ffffff' }}
            >
              Finalizar Pedido
            </button>
          </Buttons>
        </Conteiner>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;
  margin: 50px 0 20px 75px;

  @media screen and (max-width: 444px) {
  }
`;

const Search = styled.div`
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

const ProductsList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
  overflow-x: hidden;

  @media screen and (max-width: 444px) {
    flex-direction: column;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 250px;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-right: 20px;

  background-image: url(/src/assets/images/background.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.21);

  border-radius: 8px;

  position: relative;

  img {
    width: 100px;
    height: 100px;

    margin-top: 20px;
    margin-bottom: 20px;
    z-index: 1;
    position: absolute;
    top: 30px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 30px;

    position: absolute;
    bottom: 0;

    width: 100%;
    height: 55%;

    background-color: #fff;
    border-radius: 8px;

    h1 {
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;
      font-family: 'Poppins';
      margin-bottom: 10px;
    }

    h2 {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: center;
      font-family: 'Poppins';
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;
      font-family: 'Poppins';
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 444px) {
    flex-direction: column;
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
