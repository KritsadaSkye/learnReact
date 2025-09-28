import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes >
  )
}

export default App
