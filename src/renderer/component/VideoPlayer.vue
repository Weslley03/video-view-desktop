<template>
  <div class="video-js">
    <video ref="playerContainer" class="vjs-default-skin"></video>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import videojs from 'video.js'
import type { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

const props = defineProps<{
  src: string | null
}>()

const emit = defineEmits<{ (e: 'loadedMetadata', info: { duration: number; width: number; height: number }): void }>()

const playerContainer = ref<HTMLDivElement | null>(null)
let player: VideoJsPlayer | null = null

const getMimeType = (filePath: string) => {
  if (filePath.endsWith('.mp4')) return 'video/mp4'
  if (filePath.endsWith('.webm')) return 'video/webm'
  return 'video/mp4'
}

watch(() => props.src, (newSrc) => {
  if (!newSrc || !playerContainer.value) return
  const mimeType = getMimeType(newSrc)

  if (player) {
    player.src({ src: newSrc, type: mimeType })
  } else {
    player = videojs(playerContainer.value, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{ src: newSrc, type: mimeType }],
    })
  }
})

onMounted(() => {
  if (!playerContainer.value || !props.src) return

  const mimeType = getMimeType(props.src)

  const options: VideoJsPlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    controlBar: {
      fullscreenToggle: false
    },
    sources: [
      {
        src: props.src,
        type: mimeType,
      },
    ],
  }

  player = videojs(playerContainer.value, options)

  player.on('loadedmetadata', () => {
    if (!player) return
    emit('loadedMetadata', {
      duration: player.duration(),
      width: player.videoWidth(),
      height: player.videoHeight(),
    })
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
    player = null
  }
})
</script>

<style>
@import 'video.js/dist/video-js.css';
.video-js {
  width: 80%;
  height: 80%;
  max-width: 100%;
  max-height: 100%;
}

.vjs_video_15477-dimensions,
#vjs_video_3 {
  max-width: 100%;
  max-height: 100%;
}
</style>
