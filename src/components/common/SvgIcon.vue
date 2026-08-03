<template>
  <component
    :class="['svg-icon', className]"
    :style="{
      width: size + 'px',
      height: size + 'px',
      color: color,
    }"
    :is="iconComponent" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import preloadedIcons from 'virtual:svg-icons-enhance';

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    color?: string;
    className?: string;
  }>(),
  {
    size: 16,
    color: '',
    className: '',
  },
);

const iconComponent = computed(() => preloadedIcons[props.name]);
</script>

<style lang="scss">
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
