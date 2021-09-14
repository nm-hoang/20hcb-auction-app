import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import mappedRoutes from '../../routes/mappedRoutes';

function MainLayout() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {mappedRoutes}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default MainLayout;
