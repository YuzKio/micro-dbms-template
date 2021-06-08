import defaultSettings from '@/settings'

const title = defaultSettings.title || 'micro DMBS front'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
