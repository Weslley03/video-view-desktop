<template>
  <button
    class="button"
    :disabled="disabled"
    @click="$emit('click')"
  >  
    {{ text }}
    <span v-if="$slots.icon" class="icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<script setup lang="ts">

defineProps<{
  text?: string
  disabled?: boolean
}>()

defineEmits(['click'])

</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 42px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  background: var(--color-secondary300);
  color: var(--color-primary100);
  cursor: pointer;
  transition: all 0.2s ease;
}
.icon {
  display: flex;
  align-items: center;
}
.button:hover:not(:disabled) {
  color: white;
}
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-primary300);
  color: var(--color-primary100);
}
</style>