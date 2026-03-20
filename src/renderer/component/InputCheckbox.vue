<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="updateValue"
    />

    <span class="checkmark"></span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--color-primary100);
}
.checkbox input {
  display: none;
}
.checkmark {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: var(--color-primary300);
  border: 1px solid var(--color-primary200);
  position: relative;
}
.checkbox input:checked + .checkmark {
  background: var(--color-secondary300);
  border-color: var(--color-secondary200);
}
.checkbox input:checked + .checkmark::after {
  content: "";
  position: absolute;

  left: 4px;
  top: 1px;

  width: 5px;
  height: 9px;

  border: solid white;
  border-width: 0 2px 2px 0;

  transform: rotate(45deg);
}
</style>