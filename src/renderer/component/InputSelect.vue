<template>
  <div class="select-container">
    <select
      class="select"
      :value="modelValue"
      @change="handleChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <span class="select-arrow">⌄</span>
  </div>
</template>

<script setup lang="ts">
import { SelectOption } from '../../type/SelectOptionType'

const props = defineProps<{
  options: SelectOption[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.select-container {
  position: relative;
  width: 100%;
}

.select {
  width: 100%;
  padding: 10px 40px 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: var(--color-secondary400);
  color: var(--color-text);
  font-size: 14px;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.select:focus {
  border-color: var(--color-primary100);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-text);
  font-size: 14px;
}
</style>