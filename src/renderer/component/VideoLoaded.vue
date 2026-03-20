<template>
  <div class="video">
    <VideoPlayer :src="videoSrc" @loadedMetadata="handleLoadedMetadata"/>
    <div>
      <BaseButton text="Choose other File" @click="emit('choose-file')"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue';
import VideoPlayer from './VideoPlayer.vue';

export type Info = { duration: number; width: number; height: number }

// props
const props = defineProps<{
  videoSrc: string,
}>()

// emits
const emit = defineEmits<{
  (e: 'choose-file'): void,
  (e: 'loadedMetadata', info: Info): void
}>()

const handleLoadedMetadata = (info: Info) => {
  emit('loadedMetadata', info)
}
</script>

<style scope>
.video {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>