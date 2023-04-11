import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import PropTypes from 'prop-types';

const {Search} = Input;

function SearchInput({placeholder, name, value, onChange, onSearch}) {
    return (
        <Search
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            allowClear
            enterButton={<SearchOutlined/>}
            onSearch={onSearch}
        />
    );
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchInput;