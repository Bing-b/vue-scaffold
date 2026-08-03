# Vue 3 + Vite + TypeScript 前端脚手架

通用企业级 Vue 3 前端研发脚手架模板，集成 Element Plus、TailwindCSS v4、Pinia、Axios 规范化请求与 Commitizen 交互式提交规范。

---

## 🌟 技术栈

- **核心框架**: [Vue 3.5](https://vuejs.org/) + [TypeScript 4.9+](https://www.typescriptlang.org/)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **UI 组件库**: [Element Plus 2.9+](https://element-plus.org/) + [Lucide Icons](https://lucide.dev/)
- **样式引擎**: [TailwindCSS v4](https://tailwindcss.com/) + SASS
- **状态管理**: [Pinia](https://pinia.vuejs.org/) (含凭证持久化)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **网络请求**: [Axios](https://axios-http.com/) (统一拦截、Token 自动注入与响应提示)
- **提交规范**: [Commitizen](https://github.com/commitizen/cz-cli) + `cz-customizable` 中文交互提交

---

## 📁 目录结构

```text
├── .cz-config.cjs          # Commitizen 提交规范交互配置
├── .env                    # 全局通用环境变量
├── .env.development        # 开发环境变量 (后端 API 代理配置)
├── .env.production         # 生产打包环境变量
├── .eslintrc.cjs           # ESLint 代码规范配置
├── .prettierrc             # Prettier 格式化配置
├── default.conf            # Nginx 生产部署配置
├── Dockerfile              # Docker 镜像构建脚本
├── index.html              # HTML 入口
├── package.json            # 项目依赖与脚本
├── tsconfig.json           # TS 规范配置
├── vite.config.ts          # Vite 构建与插件配置
└── src/
    ├── api/                # 后端 API 接口定义
    ├── assets/             # 静态资源与 SVG 图标
    ├── components/         # 全局通用组件
    ├── enums/              # 常量枚举定义
    ├── layouts/            # 布局框架与顶部导航
    ├── router/             # 路由配置与全局守卫
    ├── store/              # Pinia 状态管理
    ├── style.css           # Tailwind 入口及全局样式
    ├── types/              # 全局 TS 类型声明
    ├── utils/              # 辅助工具函数 (request.ts, jsencrypt.ts)
    └── views/              # 业务页面视图
        ├── login.vue       # 登录页面
        └── dashboard/      # 工作台/首页
```

---

## 🚀 快速开始

### 1. 安装依赖

使用 Node.js >= 22 与 pnpm >= 9：

```bash
pnpm install
```

### 2. 本地开发

运行以下命令启动开发服务器：

```bash
pnpm dev
```

### 3. 代码提交规范

提交代码时使用交互式命令：

```bash
pnpm commit
```

---

## 📦 打包部署

### 生产环境打包

```bash
pnpm build
```

打包产物输出在 `dist/` 目录下。

### Docker 容器化部署

```bash
docker build -t vue-scaffold:latest .
docker run -d -p 80:80 vue-scaffold:latest
```
