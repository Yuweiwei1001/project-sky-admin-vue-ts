#!/bin/bash

echo "=== 开始分批安装所有依赖 ==="

# 第一批：核心Vue框架
echo "第一批：安装Vue核心框架..."
npm install vue@^2.6.14 vue-router@^3.5.4 vuex@^3.6.2

# 第二批：TypeScript支持
echo "第二批：安装TypeScript支持..."
npm install typescript vue-class-component vue-property-decorator vue-tsx-support

# 第三批：UI组件库
echo "第三批：安装UI组件库..."
npm install element-ui @types/element-ui

# 第四批：HTTP和工具库
echo "第四批：安装工具库..."
npm install axios js-cookie normalize.css path-to-regexp

# 第五批：样式相关
echo "第五批：安装样式相关..."
npm install sass sass-loader node-sass

# 第六批：开发构建工具
echo "第六批：安装开发构建工具..."
npm install --save-dev @vue/cli-plugin-eslint @vue/cli-plugin-router @vue/cli-plugin-typescript @vue/cli-plugin-vuex @vue/cli-service

# 第七批：代码质量工具
echo "第七批：安装代码质量工具..."
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-typescript eslint eslint-plugin-vue

# 第八批：其他开发工具
echo "第八批：安装其他开发工具..."
npm install --save-dev webpack webpack-cli webpack-dev-server

echo "=== 所有依赖安装完成 ==="
