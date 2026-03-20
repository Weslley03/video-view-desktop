<template>

  <Teleport to="#modals">
    <Modal :isOpen="openModal" @close="openModal = false">
      <template #header>
        <span> settings </span>
      </template>

      <template #content>
        <div class="option">
          <span> select your theme </span>
          <InputSelect v-model="themeSelected" :options="themeOptions"/>
        </div>
      </template>
    </Modal>
  </Teleport>

  <header class="top">
    <div class="block">
      <FileVideo class="icon" :color="iconColor" :size="18"/>
      <span class="title"> Video View and Converter </span>
    </div>
    <div class="block">
      <Settings class="icon" :color="iconColor" :size="18" @click="openModal = true"/>  
    </div>
  </header>
</template>

<script lang="ts" setup>
import { FileVideo, Settings } from 'lucide-vue-next';
import Modal from './Modal.vue';
import { computed, ref, Teleport } from 'vue';
import { SelectOption } from '../../type/SelectOptionType.js';
import { ThemeKey, themes } from '../theme/themes.js';
import InputSelect from './InputSelect.vue';
import { useTheme } from '../composable/useTheme';
const { theme, setTheme } = useTheme()

// ui
const iconColor = computed(() => theme.theme.colors.primary100)
const openModal = ref<boolean>(false)

const themeSelected = computed<ThemeKey>({
  get: () => theme.theme.name as ThemeKey,
  set: (newThemeKey) => {
    if (!newThemeKey) return
    setTheme(newThemeKey)
  }
})

const themeOptions: SelectOption[] = Object.keys(themes).map((theme) => {
  return {
    label: theme,
    value: theme,
  }
})

</script>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 20px;
  height: 45px;
  background: var(--color-primary400);
  border-bottom: 1px solid var(--color-primary100);
}
.title {
  font-weight: 600;
}

.block {
  display: flex;
  align-items: center;
  gap: 12px;
}
.block .icon {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.block:hover .icon {
  transform: scale(1.1);
}

.option {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}
</style>