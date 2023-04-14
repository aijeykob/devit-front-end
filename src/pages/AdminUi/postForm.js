import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

import TextArea from 'antd/es/input/TextArea';

function PostForm({ form, post, errors }) {
  return (
    <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} autoComplete="off" initialValues={post}>
      <Form.Item
        name="title"
        label="Title"
        validateStatus={errors?.title ? 'error' : ''}
        help={errors?.title}
        rules={[
          {
            required: true,
            message: 'Please enter a title',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please enter a description',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="link"
        label="Link"
        validateStatus={errors?.link ? 'error' : ''}
        help={errors?.link}
        rules={[
          {
            required: true,
            message: 'Please enter a link',
          },
          {
            validator: (_, value) => {
              if (!value || /^https?:\/\/\S+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('Please enter a valid URL');
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="creator"
        label="Creator"
        validateStatus={errors?.creator ? 'error' : ''}
        help={errors?.creator}
        rules={[
          {
            required: true,
            message: 'Please enter a creator',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="guid" label="Guid" validateStatus={errors?.guid ? 'error' : ''} help={errors?.guid}>
        <Input type="number" />
      </Form.Item>
    </Form>
  );
}

PostForm.propTypes = {
  form: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

export default PostForm;
