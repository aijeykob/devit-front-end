import {Modal, Form} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import PostForm from './postForm';
import {getPost, updatePost, editPostClearErrors} from "../../actions";

function EditPostModal(props) {
    const errors = useSelector((state) => state.editPost.errors);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (props.postId) {
            dispatch(getPost(props.postId, (data) => {
                setPost(data)
            }))
        }
    }, [props.postId]);

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                title: post.title,
                description: post.description,
                link: post.link,
                creator: post.creator,
                guid: post.guid,
            });
        }
    }, [post, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                postId: props.postId
            }
            dispatch(updatePost(data, () => {
                dispatch(editPostClearErrors())
                props.onSuccess()
            }));
        });
    };

    const handleCancel = () => {
        dispatch(editPostClearErrors())
        form.resetFields();
        props.onClose();
    };

    return (
        <Modal
            visible={props.visible}
            title="Create Post"
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Save"
            cancelText="Cancel"
        >
            <PostForm
                form={form}
                post={post}
                errors={errors}
            />
        </Modal>
    );
}

EditPostModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    postId: PropTypes.number.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditPostModal