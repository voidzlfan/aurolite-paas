# Aurolite-Paas

该项目使用Ant Design Pro进行初始化

PaaS是（Platform as a Service）的缩写，是指平台即服务

把服务器平台作为一种服务提供的商业模式，通过网络进行程序提供的服务称之为SaaS(Software as a Service)

而云计算时代相应的服务器平台或者开发环境作为服务进行提供就成为了PaaS(Platform as a Service)


## 开发环境

```bash
node v12.16.1
ant design pro v4
vscode
```

## 下载启动

```bash
git clone https://github.com/voidzlfan/aurolite-paas.git
# download complete
cd aurolite-paas
tyarn install
tyarn start
```

## 更新日志

### 2021/04/07
  1. 暂时不写代码了，由于没有产品经理，没有网站设计稿，上周老大说了几个改动的地方，修改的幅度有点大，
     我觉得这样开发实在是太浪费时间了，提出了先设计好界面再来开发，这样万一有什么需要改动的，也好改，
     百度找了下，发现了`Sketch`，antd还提供`Kitchen`资产，我感觉这就是我需要的

### 2021/04/01 🤡
  1. 实现账号管理、项目管理前端展示，待后端开发接口联调，账号管理还有项目权限分配未做好
     设想用antd的Tree实现
  2. 项目有两个路由菜单导航（homeMenu、projectMenu），实现点击项目条切换projectMenu，
     这玩意搞了好久，没实际用过proLayout，光百度动态路由就花费大量时间
  3. 开始设计设备监控模块，目前进度：完成静态页面，数据写死，还没设计交互

### 2021/03/22
  1. 创建并初始化项目
  2. 花费了一周熟悉ant design pro项目以及开发流程，官方文档看的头大，
     幸好看到了`@羽旋杯水`写的文档，虽然不是v4的，帮助真的很大
        https://www.yuque.com/study365/ant/zklepo
     前端要学的东西也好多呀，集成了antd、umi、dva等，这使得开发有后端的味道了
  3. 删除不必要的自带功能，修改国际化
  4. 创建菜单路由，静态页面编写
       * 项目管理
       * 账号管理

