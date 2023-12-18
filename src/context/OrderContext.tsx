import axios from 'axios';
import React, { createContext, useEffect } from 'react';

export const OrderContext = createContext(undefined);

export function OrderProvider({ children }) {
  const [orderList, setOrderList] = React.useState([]);

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

  function fetchOrderList() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/orders`)
      .then(res => {
        setOrderList(res.data as Order[]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchOrderList();
  });

  return (
    // eslint-disable-next-line
    <OrderContext.Provider value={{ orderList, fetchOrderList, setOrderList }}>
      {children}
    </OrderContext.Provider>
  );
}
