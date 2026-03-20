import Store from 'electron-store'
import { themes } from '../renderer/theme/themes.js' 

type StoreSchema = {
  theme: keyof typeof themes
}

export const store = new Store<StoreSchema>({
  defaults: {
    theme: 'blue'
  }
})