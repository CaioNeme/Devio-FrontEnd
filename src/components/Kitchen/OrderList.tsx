import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import notification from '../../assets/aud/audio.mp3';
import { OrderContext } from '../../context/OrderContext';
import { PropsOrderList } from '../../utils/protocols';

export default function OrderList(props: PropsOrderList): React.ReactElement {
  const { type } = props;
  const { orderList, fetchOrderList } = useContext(OrderContext);

  type Itens = {
    id: number;
    note: string;
    quantity: number;
    paidPrice: number;
    status: string;
    productId: number;
    productImage: string;
    productName: string;
    extraId: number;
  };
  type Order = {
    id: number;
    clientName: string;
    orderStatus: string;
    paymentMethod: string;
    itens: Itens[];
  };

  function confirmOrder(id: number) {
    axios
      .put(`${import.meta.env.VITE_API_URL}/orders/conclude/${id}`)
      .then(() => {
        const audio = new Audio(notification);
        audio.play();
        fetchOrderList();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function cancelOrder(id: number) {
    axios
      .put(`${import.meta.env.VITE_API_URL}/orders/cancel/${id}`)
      .then(res => {
        console.log(res);
        fetchOrderList();
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      {orderList.length !== 0 ? (
        <List>
          {orderList.map((order: Order) =>
            order.orderStatus === type ? (
              <ItemList
                style={type === 'READY' ? { border: '1px solid green' } : {}}
                key={order.id}
              >
                <img src={order.itens[0].productImage} alt="Item" />
                <div>
                  <h2>
                    {order.id} - {order.clientName}
                  </h2>
                  {order.itens.map((item: Itens) => (
                    <p key={item.id}>{item.productName}</p>
                  ))}
                </div>
                <div>
                  <button onClick={() => cancelOrder(order.id)} type="button">
                    ✖
                  </button>
                  <button
                    onClick={() => confirmOrder(order.id)}
                    style={type === 'READY' ? { display: 'none' } : {}}
                    type="button"
                  >
                    ✔
                  </button>
                </div>
              </ItemList>
            ) : null,
          )}
        </List>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </div>
  );
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ItemList = styled.li`
  width: 60%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin-left: 50px;
  margin-bottom: 15px;
  padding: 10px;

  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  position: relative;

  img {
    width: 60px;
    height: 60px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    position: absolute;
    left: 20px;
  }

  h2 {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    margin-left: 50px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    color: #929292;
    margin-left: 50px;
  }

  div:last-child {
    height: 60px;
    margin-left: 30px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button:first-child {
      color: red;
      background-color: #fae5e5;

      width: 30px;
      height: 30px;
      margin-left: 10px;

      text-align: center;
      font-size: 20px;
      font-family: 'Roboto', sans-serif;

      box-shadow: none;
      border: none;
      border-radius: 5px;
    }

    button:last-child {
      color: green;
      background-color: #e5f5e6;

      width: 30px;
      height: 30px;
      margin-left: 10px;

      text-align: center;
      font-size: 20px;
      font-family: 'Roboto', sans-serif;

      box-shadow: none;
      border: none;
      border-radius: 5px;
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
