import { Tree, Input } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchTree = (props) => {

  const onChange = (e) => {
    const { value } = e.target;
    console.log('value', value);
  };

  const titleRender = (nodeData) => {
    //console.log(nodeData);
    return (
      <div key={nodeData.key}>
        <span>{nodeData.title}</span>
        {nodeData.exception ? (
          <span>
            <LayoutOutlined style={{ color: 'red', marginLeft: '30%' }} />
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <Search style={{ marginBottom: 20 }} placeholder="快速搜索" onChange={onChange} />
      <Tree
        treeData={props.treeData || []}
        autoExpandParent={true}
        defaultSelectedKeys={['0-0']}
        blockNode={true}
        autoExpandParent={true}
        titleRender={titleRender}
        onSelect={console.log('select')}
      />

    </div>
  );
};

export default SearchTree;
