import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Employees from './pages/Employees';
import Settings from './pages/Settings';
import Layout from './components/Layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/employees" replace /> },
      { path: '/employees', element: <Employees /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
];

const AppRoutes: React.FC = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};

export default AppRoutes;
