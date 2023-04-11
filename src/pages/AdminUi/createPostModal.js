import {Modal, Form} from 'antd';
import {useDispatch, useSelector} from "react-redux";

import {createPost} from "../../actions";
import PostForm from './postForm';

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
            <PostForm
                form={form}
                post={{}}
                errors={errors}
            />
        </Modal>
    );
}

export default CreatePostModal