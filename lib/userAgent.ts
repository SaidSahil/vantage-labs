export type DeviceType = 'Mobile' | 'Tablet' | 'Desktop'

export function classifyDevice(userAgent: string | null | undefined): DeviceType {
  if (!userAgent) return 'Desktop'
  const ua = userAgent.toLowerCase()
  if (/ipad|tablet|(android(?!.*mobile))/.test(ua)) return 'Tablet'
  if (/mobi|iphone|ipod|android/.test(ua)) return 'Mobile'
  return 'Desktop'
}

export function classifyBrowser(userAgent: string | null | undefined): string {
  if (!userAgent) return 'Unknown'
  const ua = userAgent.toLowerCase()
  if (ua.includes('edg/')) return 'Edge'
  if (ua.includes('opr/') || ua.includes('opera')) return 'Opera'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('crios') || (ua.includes('chrome') && !ua.includes('edg/'))) return 'Chrome'
  if (ua.includes('fxios')) return 'Firefox'
  if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios')) return 'Safari'
  return 'Other'
}
