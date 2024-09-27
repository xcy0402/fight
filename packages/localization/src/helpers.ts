// import AR from '../../../locales/ar-SA.json';
// import BN from '../../../locales/bn-BD.json';
// import DE from '../../../locales/de-DE.json';
// import EL from '../../../locales/el-GR.json';
// import ENUS from '../../../locales/en-US.json';
// import ESES from '../../../locales/es-ES.json';
// import FI from '../../../locales/fi-FI.json';
// import FIL from '../../../locales/fil-PH.json';
// import FR from '../../../locales/fr-FR.json';
// import HI from '../../../locales/hi-IN.json';
// import HU from '../../../locales/hu-HU.json';
// import ID from '../../../locales/id-ID.json';
// import IT from '../../../locales/it-IT.json';
// import JA from '../../../locales/ja-JP.json';
// import KO from '../../../locales/ko-KR.json';
// import NL from '../../../locales/nl-NL.json';
// import PL from '../../../locales/pl-PL.json';
// import PTBR from '../../../locales/pt-BR.json';
// import PTPT from '../../../locales/pt-PT.json';
// import RO from '../../../locales/ro-RO.json';
// import RU from '../../../locales/ru-RU.json';
// import SVSE from '../../../locales/sv-SE.json';
// import TA from '../../../locales/ta-IN.json';
// import TR from '../../../locales/tr-TR.json';
// import UK from '../../../locales/uk-UA.json';
// import VI from '../../../locales/vi-VN.json';
// import ZHCN from '../../../locales/zh-CN.json';
// import ZHTW from '../../../locales/zh-TW.json';
import { EN } from './config/languages';
const publicUrl = 'https://static.fightdefi.pro/locales'
// const publicUrl = '../../../locales'

export const LS_KEY = 'pancakeswap_language'

export const fetchLocale = async (locale: string) => {
  // return locales[locale]
  const response = await fetch(`${publicUrl}/${locale}.json`)
  if (response.ok) {
    const data = await response.json()
    return data
  }

  console.error(`API: Failed to fetch locale ${locale}`, response.statusText)
  return null
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
// export const locales={
//   'ar-SA': AR,
//   'bn-BD': BN,
//   'en-US': ENUS,
//   'de-DE': DE,
//   'el-GR': EL,
//   'es-ES': ESES,
//   'fi-FI': FI,
//   'fil-PH': FIL,
//   'fr-FR': FR,
//   'hi-IN': HI,
//   'hu-HU': HU,
//   'id-ID': ID,
//   'it-IT': IT,
//   'ja-JP': JA,
//   'ko-KR': KO,
//   'nl-NL': NL,
//   'pl-PL': PL,
//   'pt-BR': PTBR,
//   'pt-PT': PTPT,
//   'ro-RO': RO,
//   'ru-RU': RU,
//   'sv-SE': SVSE,
//   'ta-IN': TA,
//   'tr-TR': TR,
//   'uk-UA': UK,
//   'vi-VN': VI,
//   'zh-CN': ZHCN,
//   'zh-TW': ZHTW,
// }