import { useContext } from 'react';
import { Col, Row, Form, Input, Button } from 'antd';
import AuthContext from '../components/shared/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await login(values);
  };

  return (
    <Row style={{ marginTop: 10 }}>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 8 }}>
        <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ email: '', password: '' }}>
          <Form.Item
            label="User Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not a valid email!',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
