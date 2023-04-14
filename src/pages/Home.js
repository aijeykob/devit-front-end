import React from 'react';
import { Card } from 'antd';

const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '500px', minWidth: '600px', padding: '0 10px' }}
      >
        <Card
          bodyStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }}
        >
          <Card.Meta title={<b>Welcome! Here is a Demo of Admin UI</b>} style={{ textAlign: 'center' }} />
        </Card>
      </div>
    </>
  );
};

export default Home;
