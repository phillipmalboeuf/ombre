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

export const weekday = (value: string) => {
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].findIndex(v => v === value)
}

export const deliverAt = (week_day: string, minimum_order_days: number, seed_day:number=5) => {
  let now = DateTime.now()
  if (now.weekday < seed_day) {
    return now.set({ weekday: weekday(week_day) }).plus({ days: minimum_order_days })
  } else {
    return now.plus({ days: 7 }).set({ weekday: weekday(week_day) }).plus({ days: minimum_order_days })
  }
}