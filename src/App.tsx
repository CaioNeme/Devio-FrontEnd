import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import HomePage from './pages/HomePage';
import Kitchen from './pages/Kitchen';
import NotFound from './pages/NotFound';
import Panel from './pages/Panel';
import PaymentPage from './pages/PaymentPage';

export default function App(): React.ReactElement {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}
