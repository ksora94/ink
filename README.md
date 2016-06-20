# ink

基于vuejs和store.js的新闻WebAPP

## 构建过程

### 安装依赖模块
`npm install`

### 本地调试
`npm run dev`

### 打包
`npm run build`


##目录结构

<pre>
.
│  gulpfile.js //gulp配置
│  index.html //入口页面
│  package.json //项目配置
│  README.md
│  webpack.config.js //webpack配置
├─dist
└─src
    │  main.js //webpack入口
    │  routermap.js //路由配置
    ├─components //各种组件
    ├─css //公用样式
    ├─image //图片
    ├─js
    │      collect.js //收藏数据存取
    │      directives.js //自定义指令
    │      filters.js //自定义过滤器
    │      night.js //夜间模式数据存取
    │      setting.js //设置数据存储
    └─resource
</pre>

##使用的接口

[http://showdoc.dagoogle.cn/index.php/6](http://showdoc.dagoogle.cn/index.php/6)