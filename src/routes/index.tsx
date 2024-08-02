import { BrowserRouter, Navigate,Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { CategoryPage } from '@/pages/Category';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import { OrderPage } from '@/pages/Order';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';

export const AppRoutes = () => {
  return (
    <BrowserRouter basename="/react-deploy">
      <Routes>
        <Route path={RouterPath.root} element={<Layout />}>
          <Route path={RouterPath.home} element={<HomePage />} />
          <Route path={RouterPath.category} element={<CategoryPage />} />
          <Route path={RouterPath.productsDetail} element={<GoodsDetailPage />} />
          <Route path={RouterPath.myAccount} element={<PrivateRoute />}>
            <Route path={RouterPath.myAccount} element={<MyAccountPage />} />
          </Route>
          <Route path={RouterPath.order} element={<PrivateRoute />}>
            <Route path={RouterPath.order} element={<OrderPage />} />
          </Route>
          <Route path={RouterPath.notFound} element={<Navigate to={RouterPath.home} />} />
        </Route>
        <Route path={RouterPath.login} element={<LoginPage />} />
        <Route path={RouterPath.join} element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
};
