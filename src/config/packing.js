/**
 * 和构建工具相关的配置信息
 * @author Joe Zhong <zhong.zhi@163.com>
 * @module config/packing
 */
import path from 'path';
import packingGlob from 'packing-glob';

export default {
  // 文件路径，所有目录都使用相对于项目根目录的相对目录格式
  path: {
    // 源文件目录
    src: 'src',

    // 页面初始化mock数据文件存放目录
    mockPageInit: 'mock/pages',

    // dll输出目录
    dll: '.tmp/dll',

    // 静态文件目录，可以设置在src里，也可以设置在src外
    assets: 'assets',

    // 编译后的静态文件目录
    // 该目录需要添加到项目根目录下的.gitignore中
    assetsDist: 'prd/assets',

    // 模版目录，如果模版支持继承或layout的话
    // 模板一般会再区分布局文件(layout)和网页文件(pages)
    templates: 'src/templates',

    // 编译后的模版目录，如果模版支持继承或layout的话
    // 模板一般会再区分布局文件(layout)和网页文件(pages)
    // 该变量修改时，需要同步修改pom.xml文件`project.properties.qzz_files`节点值
    // 该目录需要添加到项目根目录下的.gitignore中
    templatesDist: 'prd/templates',

    // 模版网页文件，如果没有使用layout的话，保持这个地址和`templates`一致
    templatesPages: 'src/templates/pages',

    // 编译后的模版网页文件，如果没有使用layout的话，保持这个地址和`templatesDist`一致
    templatesPagesDist: 'prd/templates/pages',

    // webpack打包入口JS文件目录
    // As value an object, a function is accepted.
    // entries: {
    //   index: './src/entries/index.js',
    //   abc: './src/entries/abc.less'
    // }
    entries: () => {
      const entryPath = 'src/entries';
      const entryPattern = '**/*.js';
      const cwd = path.resolve(entryPath);
      const config = {};
      packingGlob(entryPattern, { cwd }).forEach((page) => {
        const ext = path.extname(page).toLowerCase();
        const key = page.replace(ext, '');
        config[key] = path.join(cwd, page);
      });
      return config;
    }
  },

  // 模版引擎类型，目前支持的类型有[html,pug,ejs,handlebars,smarty,velocity,artTemplate]
  templateEngine: 'html',
  // 模版文件扩展名
  templateExtension: '.html',

  // 本地访问的域名，为了调试方便，可能改成my.qunar.com
  localhost: 'localhost',

  // dev环境启用 hmr
  hot: false,

  // 编译时做文件 md5
  longTermCaching: true,

  // 编译时做代码压缩
  minimize: true,

  // 编译时启用source map
  sourceMap: false,

  // 启用css-loader的css-modules功能
  cssModules: false,

  // 自定义css-modules类标识命名规则
  cssModulesIdentName: '[path][name]__[local]--[hash:base64:5]',

  // webserver端口
  port: {
    // 开发环境端口号
    dev: 8081,
    // 预览编译后结果的端口号
    dist: 8080
  },

  // commonChunks配置，在serve任务中被DllPlugin调用，在build任务中被CommonsChunkPlugin调用
  // CommonsChunkPlugin会将最后一个当作Entry chunk
  // 注意，如果配置了commonChunks，所有网页模版需要引用公共包文件
  // 否则会报错
  // <script src="/vendor.js"></script>
  commonChunks: {
    vendor: [
    //   'react',
    //   'react-dom'
      'packing-ajax'
    ]
  },

  // 静态资源类型
  assetExtensions: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'mp3',
    'ttf',
    'woff',
    'woff2',
    'eot',
    'svg'
  ],

  // 静态文件md5保留长度
  fileHashLength: 8,

  // URL转发路由规则配置
  // require! 表示使用本地mock文件
  rewriteRules: {
    // 网站URL与模版的对应路由关系
    '^/$': '/index.html',

    // API转发
    '^/api/(.*)': 'require!/mock/api/$1.js'
    // '^/api/(.*)': '/index.jade.html',
    // '^/api/(.*)': 'http://touch.qunar.com/api/hotel/findhotelcity?cityName=%E5%8C%97%E4%BA%AC',
    // '^/hello': 'http://localhost:3001/123/4.html',
  },

  // 用于在build中打开模板注释的配置
  // 可选值
  // String: 'html', 'js', 'css'；预置对3种代码处理。
  // RegExp: 使用正则来替换注释代码。
  // Function: 接受一个字符串参数，该参数为文件内容，返回处理后的字符串。
  // 参考：https://github.com/LHoin/webpack-uncomment-block
  uncommentPattern: 'html',

  // 是否使用GraphQL-mock-server
  graphqlMockServer: false,

  // GraphQL 地址
  graphqlEndpoint: '/graphql',

  // GraphiQL 地址
  graphiqlEndpoint: '/graphiql'

};
