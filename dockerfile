# 构建阶段
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@9.15.4

# 仅复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 执行打包
RUN pnpm run build:legacy

# 运行阶段
FROM nginx:alpine

# 从构建阶段复制静态文件
COPY --from=builder /app/dist /usr/share/nginx/html/

# 准备 Nginx 模板
COPY default.conf /etc/nginx/conf.d/default.conf.template

# 暴露端口
EXPOSE 80

# 启动脚本：注入环境变量并运行 Nginx
CMD envsubst '${SERVER_HOST} ${SERVER_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
