import React from 'react';
import { Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Homepage from '../features/homepage/pages';
import Login from '../features/auth/pages/Login';
import Signup from '../features/auth/pages/Signup';

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
