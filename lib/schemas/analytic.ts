export type LinkByDate = {
  date: Date
  clicks: number
}

export type LinkByHour = {
  hour: Date
  clicks: number
}

export type Stats = {
  totalClicks: number
  uniqueClicks: number
}

export type Country = {
  country: string
  clicks: number
  percentage: number
}

export type Analytics = {
  linkByDate: LinkByDate[]
  linkByHour: LinkByHour[]
  stats: Stats
  countries: Country[]
}
