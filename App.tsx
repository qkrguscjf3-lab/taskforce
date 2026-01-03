
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider, useSiteStore } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PortfolioList } from './pages/PortfolioList';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { Service } from './pages/Service';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Admin/Login';
import { AdminDashboard } from './pages/Admin/Dashboard';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useSiteStore();
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/portfolio" element={<Layout><PortfolioList /></Layout>} />
      <Route path="/portfolio/:slug" element={<Layout><PortfolioDetail /></Layout>} />
      <Route path="/service" element={<Layout><Service /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <AppRoutes />
      </Router>
    </SiteProvider>
  );
};

export default App;
