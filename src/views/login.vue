<template>
  <div
    class="login-container relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-slate-50">
    <!-- Background Ambient Glow -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px]"></div>
    </div>

    <!-- Login Card -->
    <div
      class="relative z-10 flex w-full max-w-md overflow-hidden rounded-2xl bg-white/90 backdrop-blur-2xl shadow-xl ring-1 ring-slate-900/5 px-8 py-10 sm:px-10 sm:py-12">
      <div class="w-full">
        <div class="mx-auto w-full max-w-sm">
          <h3 class="mb-2 text-2xl font-bold tracking-tight text-slate-800">欢迎登录</h3>
          <p class="mb-8 text-sm text-slate-400">请输入您的账户密码进入工作台</p>

          <el-form :model="loginForm" label-position="top" class="space-y-4">
            <el-form-item label="用户名">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名 (如: admin)"
                size="large"
                clearable
                @keyup.enter="handleLogin">
                <template #prefix>
                  <el-icon class="text-slate-400"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                show-password
                clearable
                @keyup.enter="handleLogin">
                <template #prefix>
                  <el-icon class="text-slate-400"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <div class="pt-2">
              <el-button
                type="primary"
                size="large"
                class="w-full font-bold! tracking-wider"
                :loading="loading"
                @click="handleLogin">
                {{ loading ? '登录中...' : '登 录' }}
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);

const loginForm = reactive({
  username: '',
  password: '',
});

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    return ElMessage.warning('请输入用户名和密码');
  }

  loading.value = true;
  try {
    // 模拟登录/API 调用
    const mockToken = 'mock_jwt_token_' + Date.now();
    userStore.patch({
      username: loginForm.username,
      token: mockToken,
      userId: '1001',
      role: loginForm.username === 'admin' ? '超级管理员' : '普通用户',
    });

    ElMessage.success('登录成功');
    router.push('/dashboard');
  } catch (error: any) {
    console.error('Login failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>
