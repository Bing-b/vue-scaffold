# 项目开发规范 (AGENTS.md)

本文档定义了 AI Agent 在当前项目中编写、修改代码时必须严格遵守的架构规范与约定。

---

## 1. API 接口开发规范

- **文件位置**：所有的 API 定义必须存放在 `src/api/` 目录下。
- **命名规范**：API 文件名必须与功能模块（View）的目录名保持一致。
  - **示例**：视图目录为 `src/views/targetQuery/`，则对应的 API 文件应为 `src/api/targetQuery.ts`。
- **集成流程**：
  1. 使用项目统一的 `request` 工具和 `RequestEnum` 定义接口。
  2. 在组件或 Hook 中引入接口函数。
  3. 在后端接口未就绪阶段，将真实的接口调用逻辑写好并**注释掉**，使用统一注释：`// 待后端接口就绪后启用`。
  4. 同时保留 Mock 数据逻辑用于 UI 展示和测试。

---

## 2. 样式编写规范

- **组件样式**：在组件的 `<style scoped lang="scss">` 块中，必须使用**原生 SCSS/CSS** 属性。
- **禁用指令**：禁止在组件 `style` 块中使用 Tailwind 的 `@apply` 或 `@reference` 指令，以避免 PostCSS 编译上下文丢失的问题。
- **原子类使用**：在 HTML 模板（`template`）中可以自由使用 Tailwind v4 的原子类。
- **视觉一致性**：遵循 "Apple-style" 设计语言，对齐原型图中的圆角（20px+）、平滑阴影及动效。

---

## 3. 目录与架构

- **逻辑分层**：复杂的业务逻辑推荐封装在模块内部的 `hooks/` 目录中。
- **布局系统**：通用导航和页眉应放在 `layouts/` 目录下。
- **类型定义**：复杂的接口参数和返回体应使用 TypeScript Interface 显式定义。

---

## 4. 代码注释规范

- **中文注释**：在生成或修改代码时，必须在关键逻辑、复杂的函数定义、以及非显而易见的业务判断处增加**必要的中文注释**，以提高代码的可读性和可维护性。

---

## 5. Vue 3 组合式 API 与语法规范

- **默认范式**：所有 Vue 组件统一采用 `<script setup lang="ts">` 组合式 API。
- **简洁易懂**：语法力求简短直观、表达清晰，避免过度包装和过于晦涩繁复的推演代码。
- **代码结构顺序**：在 `<script setup>` 块中，严禁变量与函数交叉混乱编写。必须按如下规则顺序置顶编写：
  1. **导入声明** (`import ...`)
  2. **Props / Emits 声明** (`defineProps` / `defineEmits`)
  3. **响应式变量与状态定义**（所有的 `ref` / `reactive` / `computed` / `useRouter` / `useStore` 等统一集中写在最前面）
  4. **函数与业务逻辑**（所有的 `handleXxx` / `fetchXxx` / 逻辑处理方法）
  5. **生命周期钩子** (`onMounted` / `onUnmounted` 等）
- **Props 最新解构语法**：优先使用 Vue 3.5+ 最新响应式 Props 解构语法直接提取属性（例如：`const { foo } = defineProps(['foo'])` 或 `const { foo } = defineProps<{ foo?: string }>()`），无需手动写额外的 `toRefs` 转换。
- **响应式状态**：基础数据优先使用 `ref()`，简单派生逻辑优先使用 `computed()`。
