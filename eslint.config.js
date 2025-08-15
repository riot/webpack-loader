import { defineConfig, } from 'eslint/config'
import riotEslintConfig from 'eslint-config-riot'

export default defineConfig([
  { extends: [riotEslintConfig] },
])
