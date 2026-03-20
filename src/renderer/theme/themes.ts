/*
DEFAULT THEMES
*/

import { Theme } from "../../type/ThemeType.js"

export const blueTheme: Theme = {
  name: 'blue',
  colors: {
    primary100: '#A0A3A9',
    primary200: '#6B7180',
    primary300: '#3F4558',
    primary400: '#1E2230',

    secondary100: '#7C8DB5',
    secondary200: '#4A5F8A',
    secondary300: '#2C3F66',
    secondary400: '#19223B',

    background: '#101423',
    surface: '#1E2230',
    text: '#E5E5E5'
  }
}

export const blackTheme: Theme = {
  name: 'black',
  colors: {
    primary100: '#8A8A8A',
    primary200: '#626262',
    primary300: '#414141',
    primary400: '#1F1F1F',

    secondary100: '#A0A0A0',
    secondary200: '#7A7A7A',
    secondary300: '#4F4F4F',
    secondary400: '#2A2A2A',

    background: '#121212',
    surface: '#1F1F1F',
    text: '#EAEAEA'
  }
}

export const emeraldTheme: Theme = {
  name: 'emerald',
  colors: {
    primary100: '#6FC6A4',
    primary200: '#3FAF87',
    primary300: '#258C6B',
    primary400: '#11634B',

    secondary100: '#85D2B0',
    secondary200: '#52B28D',
    secondary300: '#2F8A6C',
    secondary400: '#145F49',

    background: '#0D2E25',
    surface: '#1C4A3B',
    text: '#F0F5F2'
  }
}

/*
THEMES DEFAULT REGISTRY
*/

export const themes = {
  blue: blueTheme,
  black: blackTheme,
  emerald: emeraldTheme
}

export type ThemeKey = keyof typeof themes