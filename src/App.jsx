import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Navigate to="/home" replace /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/category" element={<Layout><Category /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />

        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Dashboard />} /> {/* Placeholder */}
          <Route path="orders" element={<Dashboard />} />   {/* Placeholder */}
          <Route path="settings" element={<Dashboard />} /> {/* Placeholder */}
        </Route>

        <Route path="*" element={<Layout><Navigate to="/home" replace /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
