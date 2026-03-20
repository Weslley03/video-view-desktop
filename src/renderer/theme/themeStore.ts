import { reactive } from 'vue'
import { themes } from './themes'

export const themeState = reactive({
  theme: themes.blue
})