import React from 'react';
import { Layout } from 'antd';
import { Switch } from 'react-router-dom';
import mappedRoutes from '../../../routes/mappedRoutes';
import Header from '../Header';
import Footer from '../Footer';
import './mainlayout.scss';

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header />
      <Content className="wrapper bg-white">
        <Switch>
          {mappedRoutes}
        </Switch>
      </Content>
      <Footer />
    </Layout>
  );
}

export default MainLayout;
