<template>
  <div class="empty">
    <div class="round-bottom">
      <Upload :color="theme.theme.colors.primary100" :size="42"/>
    </div>
    <span> Import Video File </span>
    <BaseButton text="Choose File" @click="emit('choose-file')"/>
  </div>
</template>

<script lang="ts" setup>
import { Upload } from 'lucide-vue-next';
import BaseButton from './BaseButton.vue';
import { useTheme } from '../composable/useTheme'
const { theme } = useTheme()

// emits
const emit = defineEmits<{
  (e: 'choose-file'): void
}>()
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}
.round-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 18px;
  width: fit-content;
  background-color: var(--color-secondary400);
}

span {
  font-size: 22px;
  font-weight: 500;
}
</style>