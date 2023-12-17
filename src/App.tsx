import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Kitchen from './pages/Kitchen';
import Panel from './pages/Panel';
import PaymentPage from './pages/PaymentPage';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/kitchen" element={<Kitchen />} />
//         <Route path="/panel" element={<Panel />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
}
