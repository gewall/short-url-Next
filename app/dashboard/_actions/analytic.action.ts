import { error } from "@/lib/errors"
import { ActionState } from "@/lib/schemas/action"
import { Analytics, Stats } from "@/lib/schemas/analytic"

export async function getAnalytics(
  id: string,
  token: string
): Promise<ActionState<Analytics>> {
  const reqLinkClicks = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/links/${id}/analytics/clicks`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const reqStats = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/links/${id}/analytics`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const reqCountries = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/links/${id}/analytics/country`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!reqLinkClicks.ok || !reqStats.ok || !reqCountries.ok) {
    throw error.fetchError
  }

  const linkClicks = await reqLinkClicks.json()
  const stats = await reqStats.json()
  const countries = await reqCountries.json()
  const countriesData = countries.data.map(
    (country: { country: string; clicks: number; percentage: number }) => ({
      country: country.country,
      clicks: country.clicks,
      percentage: country.percentage,
      fill: `var(--chart-${Math.floor(Math.random() * 5) + 1})`,
    })
  )

  return {
    payload: {
      linkByDate: linkClicks.data.dates || [],
      linkByHour: linkClicks.data.hours || [],
      stats: {
        totalClicks: stats.data.total_clicks,
        uniqueClicks: stats.data.unique_clicks,
      } as Stats,
      countries: countriesData,
    },
    success: true,
    error: null,
  }
}
