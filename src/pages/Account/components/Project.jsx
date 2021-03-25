import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

import styles from '../index.less'

const ProjectList = (props) => {

    const { name } = props;

    return (
        <div className={styles.projectMan}>
            <span>name</span>
            <span><DeleteOutlined /></span>
        </div>
    )

}


export default ProjectList