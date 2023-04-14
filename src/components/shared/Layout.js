import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';
import './CustomLayout.css';

const { Header, Content } = Layout;

const CustomLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {user && (
            <Menu.Item key="2">
              <Link to="/admin-ui">Admin UI</Link>
            </Menu.Item>
          )}
          <Menu.Item key="3">
            {!user && <Link to="/login">Login</Link>}
            {user && user.email}
          </Menu.Item>
          {user && (
            <Menu.Item key="4" style={{ marginLeft: 'auto' }}>
              <Button
                type="primary"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

CustomLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomLayout;
