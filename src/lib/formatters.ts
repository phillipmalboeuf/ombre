import { DateTime } from 'luxon'

export const money = (value: any) => {
  const currency = Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    // maximumFractionDigits: 0
  })
  return currency.format(value)
}

export const date = (value: string) => {
  return DateTime.fromISO(value).setLocale('fr').toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })
}