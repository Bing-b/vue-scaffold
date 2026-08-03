<template>
  <div class="space-y-6">
    <!-- Banner -->
    <div
      class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg shadow-blue-500/10">
      <h1 class="text-2xl font-bold">欢迎回来，{{ userStore.username || '开发者' }} 👋</h1>
      <p class="mt-2 text-blue-100 text-sm max-w-2xl">
        这是全新提取生成的企业级前端脚手架。包含项目研发所需的核心基础设施，可直接开始进行新业务模块的开发。
      </p>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in statCards"
        :key="index"
        class="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-500">{{ card.title }}</span>
          <div :class="['p-2 rounded-lg text-white', card.bgColor]">
            <component :is="card.icon" class="h-5 w-5" />
          </div>
        </div>
        <div class="mt-4 text-2xl font-bold text-slate-800">{{ card.value }}</div>
        <div class="mt-1 text-xs text-slate-400">{{ card.desc }}</div>
      </div>
    </div>

    <!-- Feature Overview -->
    <div class="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
      <h2 class="text-base font-bold text-slate-800 mb-4">脚手架已集成技术栈及功能模块</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.name"
          class="p-4 rounded-lg bg-slate-50 border border-slate-100">
          <div class="font-bold text-sm text-slate-700">{{ feature.name }}</div>
          <div class="text-xs text-slate-500 mt-1 leading-relaxed">{{ feature.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { Layers, Cpu, ShieldCheck, Zap } from 'lucide-vue-next';

const userStore = useUserStore();

const statCards = [
  { title: '核心框架', value: 'Vue 3.5', desc: 'Composition API + Script Setup', icon: Layers, bgColor: 'bg-emerald-500' },
  { title: '构建引擎', value: 'Vite 8', desc: '极速热重载与模块打包', icon: Zap, bgColor: 'bg-amber-500' },
  { title: 'UI 体系', value: 'Element Plus', desc: '按需自动导入 + Lucide 图标', icon: Cpu, bgColor: 'bg-blue-500' },
  { title: '原子样式', value: 'Tailwind v4', desc: '高效 CSS 设计系统', icon: ShieldCheck, bgColor: 'bg-indigo-500' },
];

const features = [
  { name: 'Pinia 状态管理', desc: '支持凭证持久化及 Pinia 模块化封装' },
  { name: 'Axios 统一封装', desc: '拦截器、Token 统一注入、防重复提交与错误提示' },
  { name: '动态路由 guard', desc: '基于身份校验的全局路由守卫与重定向' },
  { name: '打包兼容方案', desc: '支持 @vitejs/plugin-legacy 兼容低版本浏览器' },
  { name: 'SVG 图标方案', desc: '集成 vite-plugin-svg-icons-enhance 自动加载' },
  { name: 'Docker / Nginx', desc: '内置 dockerfile 与 nginx default.conf 支持一键发布' },
];
</script>
