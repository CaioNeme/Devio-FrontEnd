import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PropsProductList } from '../../utils/protocols';
import Modal from './Modal';
import ModalComponent from './ModalComponent';

export default function ProductList(
  props: PropsProductList,
): React.ReactElement {
  const {
    type,
    products,
    setItens,
    itens,
    itensIds,
    setItensIds,
    productsIds,
    setProductsIds,
  } = props;
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/extras`)
      .then(res => setExtras(res.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const initialOpenModals: { [key: number]: boolean } = {};
    products.forEach(product => {
      initialOpenModals[product.id] = false;
    });
    setOpenModals(initialOpenModals);
  }, [products]);

  function openModal(productId: number) {
    setOpenModals(prevState => ({
      ...prevState,
      [productId]: true,
    }));
  }

  function closeModal(productId: number) {
    setOpenModals(prevState => ({
      ...prevState,
      [productId]: false,
    }));
  }
  /* eslint-disable */
  return (
    <>
      <ProductsList>
        {products.map(
          product =>
            product.productType === type && (
              <Container key={product.id}>
                <Product
                  style={type	=== 'BURGUER' ? { backgroundColor: '#f96666' }: type === 'DRINK' ? { backgroundColor: '#125c13'} : { backgroundColor: '#ffeb70'}}
                  onClick={() => openModal(product.id)}
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
                <Check style={productsIds.includes(product.id) ? { display: 'block' } : { display: 'none' }}>✔</Check>
                <Modal isOpen={openModals[product.id]} closeModal={() => closeModal(product.id)}>
                  <ModalComponent
                    setItensIds={setItensIds}
                    itensIds={itensIds}
                    product={product} 
                    setItens={setItens}
                    extras={extras}
                    itens={itens}
                    setProductsIds={setProductsIds}
                    productsIds={productsIds}
                    closeModal={() => closeModal(product.id)}
                  />
                </Modal>
              </Container>
            ),
        )}
      </ProductsList>
    </>
  )
}
// eslint-enable
const Container = styled.div`
  position: relative;
`;

const Check = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 1;
  width: 200px;
  height: 250px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 50px;
  box-sizing: border-box;
  border-radius: 8px;

  background-color: rgba(98, 198, 98, 0.7);
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