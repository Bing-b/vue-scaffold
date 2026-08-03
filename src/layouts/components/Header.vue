<template>
  <header
    class="h-14 w-full bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50 sticky top-0 shadow-xs">
    <!-- Left: Logo & Title -->
    <div class="flex items-center space-x-3 cursor-pointer" @click="router.push('/')">
      <div
        class="h-9 w-9 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-lg">
        N
      </div>
      <div class="flex flex-col">
        <h1 class="text-base font-bold text-slate-800 leading-none">New Project</h1>
        <p class="text-[11px] text-slate-400 mt-1">企业级 Vue 3 前端研发平台</p>
      </div>
    </div>

    <!-- Center: Navigation -->
    <nav class="flex items-center h-full space-x-2">
      <div
        v-for="item in navItems"
        :key="item.name"
        class="flex items-center px-4 py-2 cursor-pointer font-medium text-sm transition-all duration-200 rounded-lg"
        :class="
          activeNav.startsWith(item.path)
            ? 'bg-blue-50 text-blue-600 font-semibold'
            : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
        "
        @click="handleNavClick(item.path)">
        <el-icon
          class="mr-2"
          :size="16"
          v-if="item.icon"
          :class="activeNav.startsWith(item.path) ? 'text-blue-600' : 'text-slate-400'"
          ><component :is="item.icon"
        /></el-icon>
        {{ item.name }}
      </div>
    </nav>

    <!-- Right: User Menu -->
    <div class="flex items-center space-x-4">
      <el-dropdown trigger="click" @command="handleCommand" popper-class="user-profile-dropdown">
        <div
          class="flex items-center space-x-2 px-3 py-1.5 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer outline-none">
          <div
            class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200 text-blue-600 font-bold">
            {{ userStore.username ? userStore.username.substring(0, 1).toUpperCase() : 'A' }}
          </div>
          <span class="font-medium">{{ userStore.username || '管理员' }}</span>
          <el-icon class="text-slate-400 transition-transform"><ChevronDown /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="w-[160px] p-1! overflow-hidden">
            <div class="px-3 py-2 border-b border-gray-100 mb-1">
              <div class="text-xs text-slate-400">当前身份</div>
              <div class="text-sm font-bold text-slate-800 leading-tight mt-0.5">{{
                userStore.role || '管理员'
              }}</div>
            </div>

            <el-dropdown-item command="password" class="custom-simple-item">
              <span class="text-xs py-0.5">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout" class="custom-simple-item group">
              <span class="text-xs py-0.5 text-red-500 hover:text-red-600">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- Modals -->
    <UpdatePasswordDialog v-model="showPwdDialog" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
import UpdatePasswordDialog from './UpdatePasswordDialog.vue';
import { LayoutDashboard, ChevronDown } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const activeNav = computed(() => route.path);

const navItems = [
  { name: '工作台', path: '/dashboard', icon: LayoutDashboard },
];

const showPwdDialog = ref(false);

const handleNavClick = (path: string) => {
  router.push(path);
};

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.clear();
    ElMessage.success('已成功退出');
    router.push('/login');
  } else if (command === 'password') {
    showPwdDialog.value = true;
  }
};
</script>

<style scoped lang="scss">
.custom-simple-item {
  margin: 2px 4px !important;
  border-radius: 6px !important;
  padding: 6px 12px !important;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9 !important;
  }
}
</style>
