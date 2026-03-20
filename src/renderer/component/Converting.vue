<template>
  <div class="converting">
    <div class="information">
      <div class="round-bottom">
        <FileVideo :color="theme.theme.colors.primary100" :size="42"/>
      </div>
      <span class="title"> Converting to {{ formatLabels[props.format] || props.format }} </span>
      <span class="desc"> This may take a few moments... </span>
    </div>

    <div class="progress-wrapper">
      <div class="progress-header">
        <span>Progress</span>
        <span>{{ Math.floor(progress) }}%</span>
      </div>

      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progress + '%' }"
        />
      </div>

      <div class="progress-info">
        <div>Time elapsed: {{ formatTime(elapsed) }}</div>
        <div>Estimated: {{ formatTime(duration - elapsed) }}</div>
      </div>
    </div>

    <div class="cancel-button">
      <BaseButton :text="'Cancelar'" @click="emit('cancel')"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FileVideo } from 'lucide-vue-next';
import { useTheme } from '../composable/useTheme'
import { formatTime } from '../utils';
const { theme } = useTheme()
import BaseButton from './BaseButton.vue';
import { useConversion } from '../composable/useConversion'
const { progress, elapsed, duration } = useConversion()

// emits
const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const props = defineProps<{
  format: string
}>()

const formatLabels: Record<string, string> = {
  mp4: 'MP4',
  webm: 'WebM',
  mov: 'MOV',
  avi: 'AVI',
  gif: 'GIF',
  mp3: 'MP3 (Audio)',
  wav: 'WAV (Lossless Audio)',
  hls: 'HLS Streaming'
}
</script>

<style scoped>
.converting {
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 448px;
  height: 418px;
  padding: 32px;
  border-radius: 22px;
  border: solid 1px var(--color-primary100);
  background-color: var(--color-surface);
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
.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}
.desc {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
}
.progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-secondary100);
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary200), var(--color-secondary300));
  transition: width 0.2s ease;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.progress-info {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.7;
  gap: 6px;
}

.cancel-button {
  margin-top: auto;
}
</style>