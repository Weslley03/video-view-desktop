<template>
  <transition name="modal-fade">
    <div v-if="isOpen">
      <div class="modal-backdrop" @click="$emit('close')">
        <div class="modal-wrapper" @click.stop>
          
          <div class="modal-header">
            <slot name="header" />
          </div>

          <div class="modal-body">
            <slot name="content" />
          </div>

          <div class="modal-footer">
            <slot name="footer" />
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onUnmounted, watch } from 'vue';

// props
const props = defineProps<{
  isOpen: boolean
}>()

// emits
const emit = defineEmits<{
  (e: 'close'): void
}>()

// setup
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.isOpen, (open) => {
    if (open) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
  z-index: 10000;
}

.modal-wrapper {
  width: 600px;
  max-width: 90%;
  background: var(--color-background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.modal-header {
  font-weight: bold;
  margin-bottom: 12px;
}
.modal-body {
  flex: 1;
}
.modal-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>