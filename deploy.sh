#!/bin/bash
set -e
set -u

# --- 颜色定义 ---
GREEN='\033[32m'
NC='\033[0m' # No Color

# 1. 设置默认参数
DEFAULT_BRANCH="main"
DEFAULT_VERSION="v1.0"

# 2. 交互式输入
read -p "请输入打包分支名称 (默认: $DEFAULT_BRANCH): " DEPLOY_BRANCH
DEPLOY_BRANCH=${DEPLOY_BRANCH:-$DEFAULT_BRANCH}
echo -e "${GREEN}==> 分支名称: $DEPLOY_BRANCH${NC}"

read -p "请输入打包版本号 (默认: $DEFAULT_VERSION): " DEPLOY_VERSION
DEPLOY_VERSION=${DEPLOY_VERSION:-$DEFAULT_VERSION}
echo -e "${GREEN}==> 打包版本号: $DEPLOY_VERSION${NC}"

IMAGE_NAME="vue-scaffold-web:$DEPLOY_VERSION"
CONTAINER_NAME="vue-scaffold-web-prod"

# 3. 代码合规处理
echo -e "${GREEN}==> 正在从远程拉取最新代码...${NC}"
git clean -df
git reset --hard HEAD
git fetch origin
git checkout $DEPLOY_BRANCH || git checkout -b $DEPLOY_BRANCH origin/$DEPLOY_BRANCH
git pull origin $DEPLOY_BRANCH

# 4. 构建镜像
echo -e "${GREEN}==> 正在构建镜像: $IMAGE_NAME...${NC}"
docker build -t $IMAGE_NAME .

# 5. 容器生命周期管理
echo -e "${GREEN}==> 正在清理旧容器和镜像...${NC}"
# 删除同名容器
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    docker rm -f $CONTAINER_NAME
fi

# 6. 启动新容器
# 默认后端地址
export SERVER_HOST=${SERVER_HOST:-"127.0.0.1"}
export SERVER_PORT=${SERVER_PORT:-"8080"}

echo -e "${GREEN}==> 正在启动容器: $CONTAINER_NAME${NC}"
docker run --name $CONTAINER_NAME -d -p 8600:80 \
  -e SERVER_HOST="$SERVER_HOST" \
  -e SERVER_PORT="$SERVER_PORT" \
  $IMAGE_NAME

echo -e "${GREEN}======== 部署成功 ========${NC}"
echo -e "镜像名: $IMAGE_NAME"
echo -e "后端解析: $SERVER_HOST:$SERVER_PORT"
echo -e "访问地址: http://[宿主机IP]:8600"
