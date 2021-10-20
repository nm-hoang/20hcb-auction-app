import React from 'react';
import { Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Homepage from '../features/homepage/pages';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';
import MarketplacePage from '../features/marketplace/pages';
import ProductDetails from '../features/product/page/ProductDetails';
import AddProduct from '../features/product/page/AddProduct';

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
    path: '/add-product',
    component: AddProduct,
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
