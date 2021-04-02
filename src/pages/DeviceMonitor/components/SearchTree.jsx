import React, { useState, useEffect } from 'react';
import { Tree, Input } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';

import styles from '../index.less';

const { Search } = Input;

//查找父节点
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

//用以存储所有的TreeNode
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title: title });
    if (node.children) {
      generateList(node.children);
    }
  }
};

/**
 * 设备监控-区域结构
 */
const SearchTree = (props) => {
  const { treeData, setCurrentStructure } = props;
  //设置TreeSearch loading
  const [treeLoading, setTreeLoading] = useState(false);

  //以下设置搜索展开所需属性
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAtoExpandParent] = useState(true);

  // ！！！这个useEffect有bug，当treeData变化时，dataList会在原数据上再增加TreeNode
  // 出现几率很小，比如同一时刻，增加区域，监控模块TreeData变化
  // 如果不允许多点登录，不会出现bug
  useEffect(() => {
    generateList(treeData);
  }, [treeData]);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAtoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    if(value === '' || value === undefined) {
      setExpandedKeys([])
      setAtoExpandParent(false)
      return;
    };
    console.log(dataList);
    //返回要展开的父树节点key数组
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        } //根据搜索值返回展开树父节点的key数组
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    //filter三个参数：arg1：必须，当前元素的值，arg2：可选，当前元素的索引值， arg3：可选，当前元素属于的数组对象

    // //console.log('expandedKeys', expandedKeys);

    setExpandedKeys(expandedKeys); //设置展开父节点数组
    setSearchValue(value);
    setAtoExpandParent(true);
  };

  const onSelect = (selectedKeys, info) => {
    setCurrentStructure(selectedKeys);
  };

  const titleRender = (nodeData) => {
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

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue); //判断是否有搜索框的值
      const beforeStr = item.title.substr(0, index); //截取前面字符串
      const afterStr = item.title.substr(index + searchValue.length); //截取后面的字符串
      //如果有目标值返回待样式的title，没有直接返回
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={styles.searchText}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      //如果有子节点，递归
      if (item.children) {
        //console.log('treeNode',{ title, key: item.key, children: loop(item.children) });
        return { title, key: item.key, exception: item.exception || '', children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
        exception: item.exception || '',
      };
    });

  return (
    <div>
      <Search
        style={{ marginBottom: 20 }}
        placeholder="快速搜索"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(treeData) || []}
        blockNode={true}
        titleRender={titleRender}
        onSelect={onSelect}
        height={500}
      />
    </div>
  );
};

export default SearchTree;
