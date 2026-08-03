<template>
  <div class="h-screen w-full min-w-[1280px] flex flex-col bg-[#f8fafc] overflow-x-auto overflow-y-hidden">
    <Header class="shrink-0" />
    <main class="flex-1 overflow-hidden p-6">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>
