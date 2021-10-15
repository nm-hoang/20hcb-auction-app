import React from 'react';
import { Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Homepage from '../features/homepage/pages';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import MarketplacePage from '../features/marketplace/pages';
import ProductDetails from '../features/product/page/ProductDetails';
import ResetPassword from '../features/auth/pages/ResetPassword';
import CheckMail from '../features/auth/pages/CheckMail';
import SignupSuccess from '../features/auth/pages/SignupSuccess';
import RecoveryPassword from '../features/auth/pages/RecoveryPassword';

const routes = [
  {
    key: uuidv4(),
    path: '/',
    component: Homepage,
  },
  {
    key: uuidv4(),
    path: '/login',
    component: Login,
  },
  {
    key: uuidv4(),
    path: '/signup',
    component: Signup,
  },
  {
    key: uuidv4(),
    path: '/marketplace',
    component: MarketplacePage,
  },
  {
    key: uuidv4(),
    path: '/products/:id',
    component: ProductDetails,
  },
  {
    key: uuidv4(),
    path: '/reset-password',
    component: ResetPassword,
  },
  {
    key: uuidv4(),
    path: '/checkmail',
    component: CheckMail,
  },
  {
    key: uuidv4(),
    path: '/signup-success',
    component: SignupSuccess,
  },
  {
    key: uuidv4(),
    path: '/recovery-password',
    component: RecoveryPassword,
  },
];

const mappedRoute = routes.map((route) => (
  <Route
    exact
    path={route.path}
    component={route.component}
    key={route.key}
  />
));

export default mappedRoute;
