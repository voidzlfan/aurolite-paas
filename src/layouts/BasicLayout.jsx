/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import {
  ProjectOutlined,
  UserOutlined,
  PartitionOutlined,
  SettingOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';

// 无权限页面
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

// 图标枚举
const iconEnum = {
  project: <ProjectOutlined />,
  user: <UserOutlined />,
  partition: <PartitionOutlined />,
  setting: <SettingOutlined />,
  scheduled: <ScheduleOutlined />,
  securityScan: <SecurityScanOutlined />,
};

/** Use Authorized check all menu item */
// 获取后端返回的权限路由数据，图标会丢失，所以用上面的 iconEnum 添加枚举映射
// 参考 https://github.com/umijs/umi-plugin-antd-icon-config/issues/2
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      icon: iconEnum[item.icon],
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    //console.log("tt",Authorized.check(item.authority, localItem, null));
    return Authorized.check(item.authority, localItem, null); // 参数对应路由项所需的权限、鉴权成功后的渲染内容、鉴权失败后的渲染内容
  });

// 底部
const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 奥莱敏控`}
    links={
      [
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]
    }
  />
);

const BasicLayout = (props) => {
  //console.log('props', props);
  const {
    dispatch,
    children,
    settings,
    menuData,
    currentProject,
    location = {
      pathname: '/',
    },
  } = props;
  const menuDataRef = useRef([]);
  const pathname = location.pathname;

  //console.log('location',location);
  //console.log('currentProject',props.currentProject);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'menu/fetchProjectMenu',
      });
    }
  }, []);

  const handleMenuCollapse = (payload) => {
    //console.log('payload', payload);
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();

  //项目菜单
  const projectMenu = {
    routes: menuData,
  };
  //默认菜单
  const homeMenu = {
    routes: [
      {
        path: '/',
        redirect: '/projectManage',
      },
      {
        path: '/projectManage',
        name: 'project',
        icon: 'project',
        component: './Project',
      },
      {
        path: '/accountManage',
        name: 'account.manage',
        icon: 'user',
        component: './Account',
      },
      {
        component: './404',
      },
    ],
  };

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      {...props} //注入包含route.js路由配置信息
      {...settings} //注入defaultSettings.js配置信息
      route={
        pathname === '/projectManage' || pathname === '/accountManage' ? homeMenu : projectMenu
      }
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => {
        history.push('/projectManage');
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      // breadcrumbRender={(routers = []) => [
      //   {
      //     path: '/',
      //     breadcrumbName: formatMessage({
      //       id: 'menu.home',
      //     }),
      //   },

      //   ...routers,
      // ]}
      // itemRender={(route, params, routes, paths) => {
      //   const first = routes.indexOf(route) === 0;
      //   return first ? (
      //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      //   ) : (
      //     <span>{route.breadcrumbName}</span>
      //   );
      // }}
      footerRender={() => {
        if (settings.footerRender || settings.footerRender === undefined) {
          return defaultFooterDom;
        }
        return null;
      }}
      //menuDataRender={() => menuDataRender(menuData)}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      //水印
      // waterMarkProps={{
      //   content: 'Aurolite',
      //   fontColor: 'rgba(24,144,255,0.15)',
      // }}
      //links={[<a>测试</a>]}
      //展示当前选中的项目名称
      headerContentRender={(BasicLayoutProps) => {
        if (pathname === '/projectManage' || pathname === '/accountManage') {
          return '';
        } else {
          return currentProject.projectName || '';
        }
      }} //(BasicLayoutProps.breadcrumb[location.pathname].name)
      //headerRender={()=> <div>sss</div>} 自定义顶栏
      //menuHeaderRender={()=> <div>sss</div>} 自定义菜单栏顶部标题和logo
      //pageTitleRender={()=>("sss")} 自定义浏览器tab标签栏上的标题
      //contentStyle={{margin: 0, padding: 0}} 整个内容区域样式
      //headerTitleRender={()=>(<div>sss</div>)} 不知道渲染什么的
      //subTitle={()=> (<div>sss</div>)}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, menu, project }) => ({
  collapsed: global.collapsed, //控制菜单的收起和展开
  settings,
  menuData: menu.menuData,
  currentProject: project.project,
}))(BasicLayout);
