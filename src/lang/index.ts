import { createI18n } from 'vue-i18n'

import zh from './zh_CN'
import en from './en_US'

const messages = {
  'zh_CN':zh,
  'en_US':en,
}
const navigatorLang = (navigator.language).toLocaleLowerCase() // 这是获取浏览器的语言
const lang = navigatorLang.indexOf('zh')>-1?'zh_CN':'en_US'
const i18n = createI18n({
  locale: localStorage.getItem('lang') || lang || 'zh_CN', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh_CN', // 设置备用语言
  messages, 
})

export default i18n
