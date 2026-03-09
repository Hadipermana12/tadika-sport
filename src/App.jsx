import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Invoice from './pages/Admin/Invoice';

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Navigate to="/home" replace /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/category" element={<Layout><Category /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        
        {/* Public Invoice Route (No Layout for printing CSS to work purely) */}
        <Route path="/invoice/:id" element={<Invoice />} />

        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
            {/* We will route all main admin pages to Dashboard but pass a prop to control the view */}
          <Route path="dashboard" element={<Dashboard defaultTab="dashboard" />} />
          <Route path="products" element={<Dashboard defaultTab="products" />} />
          <Route path="orders" element={<Dashboard defaultTab="orders" />} />
          <Route path="settings" element={<Dashboard defaultTab="settings" />} />
        </Route>

        <Route path="*" element={<Layout><Navigate to="/home" replace /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
