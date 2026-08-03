<template>
  <div class="space-y-6">
    <!-- Banner -->
    <div
      class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg shadow-blue-500/10">
      <h1 class="text-2xl font-bold">欢迎回来，{{ userStore.username || '管理员' }} 👋</h1>
      <p class="mt-2 text-blue-100 text-sm">
        工作台页面已准备就绪，您可以在此处添加业务数据看板与操作界面。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
</script>
