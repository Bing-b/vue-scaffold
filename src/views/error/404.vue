<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-6 relative overflow-hidden">
    <!-- Ambient Background Glows -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative z-10 space-y-6">
      <!-- 404 Graphic Illustration -->
      <div class="relative flex items-center justify-center">
        <div class="text-8xl font-black text-slate-100 select-none tracking-widest">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 animate-bounce-slow">
            <component :is="FileQuestion" class="w-10 h-10" />
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="space-y-2">
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">页面不存在</h1>
        <p class="text-sm text-slate-400 leading-relaxed">
          抱歉，您访问的页面不存在或已被移除，请检查输入的网址是否正确。
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <el-button
          type="default"
          class="!rounded-xl !h-11 !px-6 w-full sm:w-auto !border-slate-200 hover:!border-blue-500 hover:!text-blue-600 font-medium"
          @click="handleGoBack">
          <component :is="ArrowLeft" class="w-4 h-4 mr-2" />
          返回上一页
        </el-button>

        <el-button
          type="primary"
          class="!rounded-xl !h-11 !px-6 w-full sm:w-auto !bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium shadow-md shadow-blue-500/20"
          @click="handleGoHome">
          <component :is="Home" class="w-4 h-4 mr-2" />
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { FileQuestion, ArrowLeft, Home } from 'lucide-vue-next';

/* ------------------ 路由控制 ------------------ */

const router = useRouter();

// 返回上一页
const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};

// 返回主页
const handleGoHome = () => {
  router.push('/');
};
</script>

<style scoped lang="scss">
@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}
</style>
