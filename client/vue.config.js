/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-05-18 16:05:23
 * @LastEditTime: 2020-05-18 17:04:22
 * @LastEditors: Ruebin
 */ 
const path  = require("path");
const webpack = require("webpack");

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir:"dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: process.env.NODE_ENV === "development",
  //webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production"){
      // 为生产环境修改配置...
      config.mode = "production";
    }else{
      // 为开发环境修改配置...
      config.mode = "development";
    }
  },
  //服务器配置
  devServer: {
    open: true, //启动服务是否打开服务器
    hot: true, // 是否启动热模块更新
    proxy:{
      "/api": {
        //目标服务器
        target: "http://localhost:3000/",
        changeOrigin: true, //解决跨域，申请虚拟服务器代发请求
        ws: true, //是否代理websockets
        pathRewrite: {"^/api" : ''}, //不传递/api时，重新路径
      }
    },
    before: app => {}
  },
  //第三方插件配置
  pluginOptions: {
    'sass-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/*.scss')
      ]
    }    
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-plugin-px2rem')({
            rootValue: 100, // 换算基数，把根标签的字体规定为1rem为100px
            unitPrecision: 8, // 允许REM单位增长到的十进制数字。
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('scss', path.join(__dirname, "src/styles"));
  }
}