# New Project 脚手架 (Vue 3 + Vite 8 + TS + Element Plus + TailwindCSS v4)

基于 `audit-graph` 精简并提炼的企业级前端开发通用脚手架，开箱即用。

---

## 🌟 技术栈

- **核心框架**: [Vue 3.5](https://vuejs.org/) + [TypeScript 4.9+](https://www.typescriptlang.org/)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **UI 组件库**: [Element Plus 2.9+](https://element-plus.org/) + [Lucide Icons](https://lucide.dev/)
- **样式引擎**: [TailwindCSS v4](https://tailwindcss.com/) + SASS (modern-compiler)
- **状态管理**: [Pinia](https://pinia.vuejs.org/) + persistent storage
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **网络请求**: [Axios](https://axios-http.com/) (统一拦截、Token 自动注入、响应错误提示)

---

## 📁 目录结构

```text
E:\new-project/
├── .env                    # 全局通用环境变量
├── .env.development        # 开发环境变量 (代理服务配置)
├── .env.production         # 生产打包环境变量
├── .eslintrc.cjs           # ESLint 代码规范配置
├── .prettierrc             # Prettier 格式化配置
├── default.conf            # Nginx 生产容器部署配置
├── Dockerfile              # Docker 镜像构建脚本
├── deploy.sh               # 自动化构建脚本
├── index.html              # HTML 入口
├── package.json            # 项目依赖与脚本
├── tsconfig.json           # TS 规范
├── vite.config.ts          # Vite 打包与代理插件配置
└── src/
    ├── api/                # 后端 API 接口定义
    ├── assets/             # 静态资源与 SVG 图标库
    │   └── icons/          # SVG 图标 (.svg)
    ├── components/         # 全局通用 UI 组件 (SvgIcon 等)
    ├── enums/              # 常量枚举定义 (https 状态码等)
    ├── layouts/            # 页面框架与导航布局 (Header / Menu)
    ├── router/             # 全局路由与权限 Guard
    ├── store/              # Pinia 状态管理 (modules/user.ts)
    ├── style.css           # Tailwind 入口及全局样式重置
    ├── types/              # 全局 TS 类型声明
    ├── utils/              # 通用工具库 (request.ts, jsencrypt.ts)
    └── views/              # 业务页面视图
        ├── login.vue       # 登录示例页面
        └── dashboard/      # 工作台/首页
```

---

## 🚀 快速开始

### 1. 安装依赖

请确保您的环境中使用了 Node.js >= 22 以及 pnpm >= 9：

```bash
pnpm install
```

### 2. 本地开发

运行以下命令启动 Vite 开发服务器：

```bash
pnpm dev
```

浏览器会自动打开 `http://localhost:3000`。可输入任意用户名和密码进行登录测试。

### 3. 配置代理地址

修改 `.env.development` 中的 `VITE_PROXY_TARGET` 即可将 `/api` 请求代理到目标后端地址：

```env
VITE_API_BASE_URL=/api
VITE_PROXY_TARGET=http://your-backend-api-server.com:8080
```

---

## 📦 打包部署

### 生产环境打包

```bash
pnpm build
```

打包产物将输出在 `dist/` 目录下。

如需支持低版本浏览器，可使用 legacy 兼容编译命令：

```bash
pnpm build:legacy
```

### Docker 容器化部署

直接执行以下命令构建 Docker 镜像：

```bash
docker build -t new-project:latest .
docker run -d -p 80:80 new-project:latest
```

---

## 🔧 新增页面指南

1. **添加页面**: 在 `src/views/` 目录下新建 Vue 文件（例如 `src/views/user/index.vue`）。
2. **配置路由**: 在 `src/router/index.ts` 中的 `children` 路由配置项添加新路径。
3. **添加导航菜单**: 在 `src/layouts/components/Header.vue` 中的 `navItems` 数组添加对应路径和图标即可。
