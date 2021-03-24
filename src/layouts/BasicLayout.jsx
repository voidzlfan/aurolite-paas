/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import secondRoute from '../../config/sec-route';

import { MenuDataItem } from '@ant-design/pro-layout';

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

// 动态路由
const serverMenuItem = () => {
  const transMenuItem = [];
  if (Array.isArray(menuData)) {
    menuData.forEach((v) => {
      const localV = { ...v, children: v.children ? menuDataRender(v.children) : [] };
      const localMenuDataItem = Authorized.check(v.authority, localV, null);
      transMenuItem.push(localMenuDataItem);
    });
  }
  return transMenuItem;
};

/** Use Authorized check all menu item */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    //console.log("tt",Authorized.check(item.authority, localItem, null));
    return Authorized.check(item.authority, localItem, null); // 参数对应路由项所需的权限、鉴权成功后的渲染内容、鉴权失败后的渲染内容
  });

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
    location = {
      pathname: '/',
    },
  } = props;
  const menuDataRef = useRef([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /** Init variables */

  const handleMenuCollapse = (payload) => {
    console.log('payload', payload);
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

  const { route } = props;

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      {...props} //注入包含route.js路由配置信息、withRouter
      {...settings} //注入defaultSettings.js配置信息
      //route={location.pathname === '/project' ? secondRoute : route}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        //menuItemProps从props接收到的menu封装
        //console.log('menuItemProps',menuItemProps);
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
      headerContentRender={(BasicLayoutProps)=> "BasicLayout headerContentRender"} //(BasicLayoutProps.breadcrumb[location.pathname].name)
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

export default connect(({ global, settings, menu }) => ({
  collapsed: global.collapsed, //控制菜单的收起和展开
  settings,
  menuData: menu.menuData,
}))(BasicLayout);
