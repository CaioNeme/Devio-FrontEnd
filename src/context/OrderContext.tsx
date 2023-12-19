import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import { Order } from '../utils/protocols';

export const OrderContext = createContext(undefined);

export function OrderProvider({ children }) {
  const [orderList, setOrderList] = React.useState([]);

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
