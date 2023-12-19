import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import OrderList from '../components/Kitchen/OrderList';

export default function Kitchen(): React.ReactElement {
  return (
    <>
      <Header />
      <Conteiner>
        <Preparing>
          <h1>Preparando:</h1>
          <OrderList type="PROCESSING" />
        </Preparing>
        <Line />
        <Ready>
          <h1>Pronto:</h1>
          <OrderList type="READY" />
        </Ready>
      </Conteiner>
    </>
  );
}

const Conteiner = styled.div`
  display: flex;
`;

const Preparing = styled.div`
  width: 50%;

  h1 {
    margin-left: 50px;
    font-size: 24px;
    font-weight: bold;
    color: #000;
    text-align: left;
    margin-top: 50px;
    margin-bottom: 30px;
    font-family: 'Poppins', sans-serif;
  }
`;

const Line = styled.div`
  width: 1.5px;
  height: 80vh;
  margin-top: 50px;
  background-color: #000;
`;

const Ready = styled.div`
  width: 50%;

  h1 {
    margin-left: 50px;
    font-size: 24px;
    font-weight: bold;
    color: #000;
    text-align: left;
    margin-top: 50px;
    margin-bottom: 30px;
    font-family: 'Poppins', sans-serif;
  }
`;
