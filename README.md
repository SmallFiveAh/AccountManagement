<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 使容器高度占满整个视口 */
  }
</style>

<div class="container">
  <img src="public/resource/img/icon-128.png" alt="PAMP" />
  <h1 style="margin: 8px 0 0 0;">页面账号管理插件 (PAMP)</h1>
</div>

## 项目概述

PAMP（页面账号管理插件）是一个浏览器扩展插件，旨在帮助用户管理和存储页面相关的账号信息。该插件解决了用户在不同网站或页面间管理多个账号密码时的效率与安全性问题，特别适合需要在多个网页应用中频繁切换账号的开发者或普通用户。

## 功能特性

- **账号信息存储**：安全地存储和管理多个网站的账号信息
- **快速访问**：通过浏览器弹窗界面快速访问保存的账号
- **远程同步**：支持通过 GitHub Gist 进行数据同步和备份
- **可视化管理**：提供设置界面以配置和管理插件行为
- **响应式设计**：现代化的UI界面，支持不同屏幕尺寸

## 安装指南

### 项目结构

```plaintext
AccountManagement/                                                  # 项目根目录
├── pages/                                                          # 项目页面
│   ├── Settings/                                                   # 项目设置界面
|   |   ├── AccountRegion/                                          # 项目设置界面
|   |   |    ├── index.css                                          # 项目设置界面样式文件
|   |   |    └── index.jsx                                          # 项目设置界面
|   |   ├── Configuration/                                          # 项目设置界面
|   |   |    ├── SettingsPanel/                                     # 项目设置界面
|   |   |    |   ├── index.css                                      # 项目设置界面样式文件
|   |   |    |   └── index.jsx                                      # 项目设置界面
|   |   |    ├── index.css                                          # 项目设置界面样式文件
|   |   |    └── index.jsx                                          # 项目设置界面
|   |   ├── Masklayer/                                              # 项目设置界面
|   |   |    ├── index.css                                          # 项目设置界面样式文件
|   |   |    └── index.jsx                                          # 项目设置界面
|   |   ├── index.css                                               # 项目设置界面样式文件
|   |   └── index.jsx                                               # 项目设置界面
|   └── index.html                                                  # 项目入口文件
├── public/ 
│   └── resource/       
│       ├── img/                                                    # 插件图标
│       |   ├── icon-16.png                                         # 插件图标
│       |   ├── icon-32.png                                         # 插件图标
│       |   ├── icon-48.png                                         # 插件图标
│       |   ├── icon-128.png                                        # 插件图标
│       |   └── PAMP.svg                                            # 插件图标
│       ├── video/                                                  # 背景视频
│       |   └── background.mp4                                      # 背景视频
│       ├── background.js                                           # 背景视频播放脚本
│       └── manifest.json                                           # 插件配置文件
├── src/                                                            # 项目源码
│   ├── popup/                                                      # 弹窗页面
│   |   ├── AccountAQuantity/                                       # 弹窗组件
│   |   |   ├── index.css                                           # 弹窗样式文件
│   |   |   └── index.jsx                                           # 弹窗组件
│   |   ├── PopupHeader/                                            # 弹窗组件
│   |   |   ├── PopupSettings/                                      # 弹窗组件
│   |   |   |   ├── index.css                                       # 弹窗样式文件
│   |   |   |   └── index.jsx                                       # 弹窗组件
│   |   |   ├── PopupSettings/                                      # 弹窗组件
│   |   |   |   ├── index.css                                       # 弹窗样式文件
│   |   |   |   └── index.jsx                                       # 弹窗组件
│   |   |   ├── index.css                                           # 弹窗样式文件
│   |   |   └── index.jsx                                           # 弹窗组件
│   |   ├── UseFrequentRate/                                        # 弹窗组件
│   |   |   ├── index.css                                           # 弹窗样式文件
│   |   |   └── index.jsx                                           # 弹窗组件
│   |   ├── index.css                                               # 弹窗样式文件
│   |   └── index.jsx                                               # 弹窗组件
│   ├── index.css                                                   # 项目样式文件
│   └── index.jsx                                                   # 项目入口文件
├── .gitignore                                                      # Git 忽略文件
├── eslint.config.js                                                # ESLint 配置文件
├── index.html                                                      # 项目入口文件
├── LICENSE                                                         # 许可协议
├── package-lock.json                                               # 项目依赖包版本信息
├── package.json                                                    # 项目依赖包版本信息
├── README.md                                                       # 项目说明文档        
└── vite.config.js                                                  # Vite 配置文件
```

### 开发环境安装

1. 克隆或下载项目到本地
2. 打开 Chrome 浏览器
3. 进入 `chrome://extensions/`
4. 启用"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择项目根目录

### 使用要求

- Chrome 浏览器（推荐最新版本）
- 网络连接（用于 GitHub Gist 同步功能）

## 使用说明

### 基本操作

1. 点击浏览器工具栏中的 PAMP 图标打开弹窗
2. 在弹窗中可以查看常用账号的使用频率排名
3. 点击设置按钮进入账号管理界面
4. 在设置界面中可以添加、编辑和删除账号信息

### 账号管理

- 点击"+"按钮可以添加新的账号分类或账号
- 通过自定义添加面板可以设置账号链接、名称和图标
- 支持为账号设置个性化的图标和颜色

## 技术架构

### 核心组件

- **popup**：用户交互入口，显示账号使用频率标签云
- **background.js**：后台持久化逻辑处理
- **content script**：页面数据获取与注入
- **Settings 页面**：插件配置和账号管理界面

### 技术栈

- 原生 HTML/CSS/JavaScript 开发
- Chrome Extension API (Manifest V3)
- GitHub Gist API 集成
