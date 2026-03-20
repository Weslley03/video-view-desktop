<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        <span class="color-indicator" :style="{ backgroundColor: toastColor(toast.type) }"></span>
        <div class="content">
          <strong>{{ toast.type.toUpperCase() }}</strong>: {{ toast.message }}
        </div>
        <button class="close" @click="removeToast(toast.id)">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../../composable/useToast'

const { toasts, removeToast, toastColor } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}

.toast {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  min-width: 250px;
  border-radius: 6px;
  color: #fff;
  background-color: var(--color-background);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
}

.color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.content {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.close {
  background: transparent;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>