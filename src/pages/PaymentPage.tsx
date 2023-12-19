import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function PaymentPage(): React.ReactElement {
  const { state } = useLocation();

  console.log(state);

  return (
    <>
      <Header />
      PaymentPage
    </>
  );
}
