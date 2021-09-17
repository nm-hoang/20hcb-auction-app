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
    <Layout style={{ background: '#ffffff' }}>
      <Header />
      <Content className="wrapper" style={{ padding: '2% 5% 2% 5%', background: '#f0f2f5' }}>
        <Switch>
          {mappedRoutes}
        </Switch>
      </Content>
      <Footer />
    </Layout>
  );
}

export default MainLayout;
