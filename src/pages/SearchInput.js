import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";

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

export default SearchInput;