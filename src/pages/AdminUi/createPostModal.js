import {Modal, Form, Input} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {createPost} from "../../actions";

function CreatePostModal(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.posts.errors);
    const handleOk = () => {
        form.validateFields().then((values) => {
            dispatch(createPost(values, () => {
                props.onSuccess()
            }));
        });
    };

    const handleCancel = () => {
        form.resetFields();
        props.onClose();
    };

    return (
        <Modal
            visible={props.visible}
            title="Create Post"
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create"
            cancelText="Cancel"
        >
            <Form form={form} labelCol={{span: 5}} wrapperCol={{span: 16}} autoComplete="off">
                <Form.Item
                    name="title"
                    label="Title"
                    validateStatus={errors?.title ? "error" : ""}
                    help={errors?.title}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a title',
                        },
                    ]}
                >
                    <Input/>
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
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item
                    name="link"
                    label="Link"
                    validateStatus={errors?.link ? "error" : ""}
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
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="creator"
                    label="Creator"
                    validateStatus={errors?.creator ? "error" : ""}
                    help={errors?.creator}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a creator',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="guid"
                    label="Guid"
                    validateStatus={errors?.guid ? "error" : ""}
                    help={errors?.guid}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreatePostModal