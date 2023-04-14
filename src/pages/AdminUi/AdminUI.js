import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Table, Input, Button, Space, Pagination, Menu, Dropdown, Select } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { getPosts, removePost } from '../../actions';
import { ADMIN_UI_COLUMNS, SEARCH_FIELDS } from './constants';
import CreatePostModal from './createPostModal';
import EditPostModal from './editPostModal';
import { useModal } from './useModal';

const { Search } = Input;
const { Option } = Select;

function AdminUI() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);
  const { page, limit, total, allCreators } = useSelector((state) => state.posts);

  const [sortOrder, setSortOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState(null);

  const { visible: createModalVisible, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { visible: editModalVisible, openModal: openEditModal, closeModal: closeEditModal } = useModal();

  const openEditModalWithPostId = (postId) => {
    setPostIdToEdit(postId);
    openEditModal();
  };

  const handleCreatorChange = (value) => {
    setSearchInput({
      ...searchInput,
      creator: value,
    });
  };

  const [searchInput, setSearchInput] = useState({
    creator: '',
    title: '',
    link: '',
    guid: '',
  });

  const handleCreateOrUpdateSuccess = useCallback(() => {
    closeCreateModal();
    closeEditModal();
    dispatch(
      getPosts({
        page,
        limit,
        ...searchInput,
        ...sortOrder,
      }),
    );
  }, [page, limit, searchInput, dispatch]);

  const debouncedDispatch = useRef(
    debounce((data) => {
      dispatch(getPosts(data));
    }, 500),
  ).current;

  useEffect(() => {
    const data = {
      page,
      limit,
      ...searchInput,
      ...sortOrder,
    };
    debouncedDispatch(data);
  }, [dispatch, searchInput, debouncedDispatch]);

  const handleInternalValueChange = (e) => {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemove = (postId) => {
    dispatch(
      removePost(postId, () => {
        dispatch(
          getPosts({
            page,
            limit,
            ...searchInput,
            ...sortOrder,
          }),
        );
      }),
    );
  };

  const handlePageChange = useCallback(
    (pageChange) => {
      const data = {
        page: pageChange,
        limit,
        ...searchInput,
        ...sortOrder,
      };
      dispatch(getPosts(data));
    },
    [dispatch, limit, searchInput, sortOrder],
  );

  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(true);
    setSortOrder(sorter);
    const data = {
      page,
      limit,
      ...searchInput,
      ...sorter,
    };
    dispatch(
      getPosts(data, () => {
        setLoading(false);
      }),
    );
  };

  const menu = (postId) => (
    <Menu>
      <Menu.Item key="1" onClick={() => openEditModalWithPostId(postId)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleRemove(postId)}>
        Remove
      </Menu.Item>
    </Menu>
  );

  const guidToNumber = useMemo(() => {
    return (guid) => {
      if (guid === null) {
        return null;
      }
      guid = guid.replace(/-/g, '');
      return parseInt(guid, 16);
    };
  }, []);

  const tableColumns = useMemo(() => {
    const columns = ADMIN_UI_COLUMNS.slice();
    columns.forEach((col) => {
      if (col.title === 'Guid') {
        col.sorter = (a, b) => guidToNumber(a.guid) - guidToNumber(b.guid);
      } else if (col.title === 'Date') {
        col.sorter = (a, b) => new Date(a.pub_date) - new Date(b.pub_date);
      } else {
        col.sorter = (a, b) => {
          const sortOrder = col.sortOrder || 'ASC';
          const sortFn =
            (col.sorter && col.sorter.compare) ||
            ((a, b) => {
              if (a[col.dataIndex] < b[col.dataIndex]) return -1;
              if (a[col.dataIndex] > b[col.dataIndex]) return 1;
              return 0;
            });
          const result = sortFn(a, b);
          return sortOrder === 'DESC' ? -result : result;
        };
      }
    });
    columns.push({
      title: 'Action',
      key: 'operation',
      width: '5%',
      render: (text, record) => (
        <Dropdown overlay={menu(record.id)}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <MoreOutlined />
          </a>
        </Dropdown>
      ),
    });
    return columns;
  }, [menu]);

  return (
    <>
      <Space style={{ margin: 16 }} wrap={true}>
        {SEARCH_FIELDS.map((field) => (
          <Search
            key={field.name}
            placeholder={field.placeholder}
            name={field.name}
            value={searchInput[field.name]}
            onChange={handleInternalValueChange}
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 200 }}
          />
        ))}
        <div style={{ width: 200 }}>
          <Select defaultValue="" style={{ width: '100%' }} onChange={handleCreatorChange}>
            <Option value="">All Creators</Option>
            {allCreators.map((creator) => (
              <Option key={creator} value={creator}>
                {creator}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: 200 }}>
          <Button type="primary" onClick={openCreateModal} style={{ width: '100%' }}>
            Create Post
          </Button>
        </div>
      </Space>
      <div style={{ overflowX: 'auto' }}>
        <Table
          loading={loading}
          columns={tableColumns}
          dataSource={posts.data.map((item) => ({ ...item, key: item.id }))}
          pagination={false}
          onChange={handleTableChange}
        />
      </div>
      <Pagination
        total={total}
        pageSize={10}
        current={page}
        showSizeChanger={false}
        onChange={handlePageChange}
        style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}
      />
      <CreatePostModal
        visible={createModalVisible}
        onClose={closeCreateModal}
        onSuccess={handleCreateOrUpdateSuccess}
      />
      <EditPostModal
        visible={editModalVisible}
        postId={postIdToEdit}
        onClose={closeEditModal}
        onSuccess={handleCreateOrUpdateSuccess}
      />
    </>
  );
}

export default AdminUI;
