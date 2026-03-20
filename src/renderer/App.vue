<template>
  <Toast />
  <div class="app">
    <TitleBar />
    <main class="layout">
      <section class="viewer">
        <template v-if="!isConverting">
          <VideoLoaded v-if="videoSrc" :video-src="videoSrc" @choose-file="chooseFile" @loadedMetadata="onLoadedMetadata"/>
          <EmptyState v-if="!videoSrc" @choose-file="chooseFile"/>
        </template>
        <Converting v-else @cancel="cancel"/>
      </section>

      <aside class="sidebar">
        <h3>Conversion Settings</h3>
        <div class="setting-option">
          <label> INPUT FILE </label>
          <InputFileInfo :file="fileInfo"/>
        </div>
        <div class="setting-option">
          <label> FORMAT </label>
          <InputSelect class="input-select" v-model="format" :options="formatToOptions"/>
        </div>
        <div class="setting-option">
          <label> AUDIO </label>
          <div class="row">
            <InputCheckbox v-model="includeAudio"/>
            <span> Include audio track </span>
          </div>
        </div>
        <BaseButton
          text="Start Conversion"
          @click="convert"
          :disabled="Boolean(!fileInfo)"
        >
          <template #icon v-if="isConverting">
            <Loader2 class="spin" />
          </template>
        </BaseButton>
      </aside>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TitleBar from './component/TitleBar.vue'
import { useTheme } from './composable/useTheme'
import InputFileInfo from './component/InputFileInfo.vue'
const { setTheme } = useTheme()
import { VideoFileInfo } from '../type/VideoFileInfo.js'
import InputSelect from './component/InputSelect.vue'
import { SelectOption } from '../type/SelectOptionType'
import InputCheckbox from './component/InputCheckbox.vue'
import BaseButton from './component/BaseButton.vue'
import { useToast } from './composable/useToast'
import Toast from './component/Toast/Toast.vue'
import EmptyState from './component/EmptyState.vue'
import VideoLoaded from './component/VideoLoaded.vue'
import Converting from './component/Converting.vue'
import { provideConversion } from './composable/useConversion'
import { Loader2 } from 'lucide-vue-next'
const { progress, elapsed, duration } = provideConversion()

// ui
const { createToast } = useToast()
const isConverting = ref<boolean>(false)

// state
const videoSrc = ref<string | null>(null)
const inputPath = ref<string | null>(null)
const fileInfo = ref<VideoFileInfo | null>(null)

const includeAudio = ref<boolean>(true)
const format = ref<string>('webm')
const formatToOptions: SelectOption[] = [
  { label: 'best compatibility (mp4)', value: 'mp4' },
  { label: 'smaller file (webm)', value: 'webm' },
]

const chooseFile = async () => {
  try {
    const filePath = await window?.electronAPI?.openFile()
    if (!filePath) return

    const url = window.electronAPI.fileUrl(filePath)
    if (!url) throw new Error('no url from electronAPI.fileUrl() method.')

    inputPath.value = url
    videoSrc.value = url

    const name = filePath.split('/').pop() ?? ''
    const stats = await window.electronAPI.fileStats(filePath)

    fileInfo.value = {
      name,
      size: stats.size,
      duration: 0,
      width: 0,
      height: 0
    }
  } catch (err) {
    console.error(err)
    createToast('the video could not be loaded.', 'error')
  }
}

const convert = async () => {
  if (isConverting.value) return
  isConverting.value = true
  try {
    if (!inputPath.value) throw new Error()

    const out = inputPath.value.replace(/\.\w+$/, '_converted.' + format.value)

    await window.electronAPI.startConversion({
      inputPath: inputPath.value,
      outputPath: out,
      target: format.value,
      includeAudio: includeAudio.value
    })

    createToast('file converted successfully!', 'success', 4000)
  } catch (err: any) {
    if (err.message.includes('cancelled')) {
      createToast('conversion cancelled', 'info')
    } else {
      createToast('the file could not be converted.', 'error')
    }
  } finally {
    isConverting.value = false
  }
}

const cancel = async () => {
  await window.electronAPI.cancelConversion()
}

const onLoadedMetadata = (info: { duration: number; width: number; height: number }) => {
  if (!fileInfo.value || !info.duration || !info.width || !info.height) return
  fileInfo.value.duration = info.duration
  fileInfo.value.width = info.width
  fileInfo.value.height = info.height
}

onMounted(async () => {
  const themeKey = window?.electronAPI ? await window.electronAPI.getTheme() : "blue"
  setTheme(themeKey)

  window.electronAPI.onProgress((data) => {
    progress.value = data.percent
    elapsed.value = data.current
    duration.value = data.duration
  })
})

</script>

<style>
body {
  color: var(--color-text);
  background: var(--color-background);
}

.layout {
  display:flex;
  height:calc(100vh - 45px);
}

.viewer {
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  max-width: 1200px;
}

.viewer video {
  width:100%;
  height:100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width:320px;
  padding:0 20px;
  background: var(--color-primary400);
}

.setting-option {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.setting-option label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary200);
}

.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
