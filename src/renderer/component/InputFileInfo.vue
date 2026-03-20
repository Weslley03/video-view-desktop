<template>
  <div class="box" v-if="file">
    <div class="file-name">
      {{ file.name }}
    </div>

    <div class="file-meta">
      {{ formattedSize }} • {{ resolution }} • {{ duration }}
    </div>
  </div>

  <div v-else class="box">
    <span class="empty-text"> no file selected </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VideoFileInfo } from '../../type/VideoFileInfo';

const props = defineProps<{
  file: VideoFileInfo | null
}>()

const formattedSize = computed(() => {
  const mb = props.file!.size / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
})

const duration = computed(() => {
  const total = props.file!.duration
  const min = Math.floor(total / 60)
  const sec = Math.floor(total % 60)

  return `${min}:${sec.toString().padStart(2,'0')}`
})

const resolution = computed(() => {
  return `${props.file!.width}x${props.file!.height}`
})
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 12px;
  gap: 4px;
  border: 1px solid var(--color-primary300);
  background: var(--color-secondary400);
  user-select: none;
}

.file-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary100);
}
.file-meta {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-primary200);
}

.empty-text {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-primary300);
}
</style>