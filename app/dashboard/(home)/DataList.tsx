"use client"

import Card from "@/components/Card"
import { ActionState } from "@/lib/schemas/action"
import { Link } from "@/lib/schemas/link"
import { useEffect, useState } from "react"
import { getLinks } from "../_actions/item.action"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useUserStore } from "@/lib/store/user"

interface DataListProps {
  getLinks?: Promise<ActionState<Link[]>>
}

export default function DataList({}: DataListProps) {
  const { user } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ActionState<Link[]>>({
    error: null,
    payload: [],
    success: false,
  })

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const req = await getLinks(user.accessToken)
        setData(req)
        setLoading(false)
      } catch (err: unknown) {
        setData({
          error: (err as Error).message,
          payload: null,
          success: false,
        })
        setLoading(false)
      }
    })()
  }, [user.accessToken])

  if (loading) {
    return (
      <div className="flex justify-center" data-testid="loading">
        <Spinner className="size-8 text-cyan-400" />
      </div>
    )
  }

  if (!data.payload) {
    return (
      <div className="flex justify-center">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>You have no links</AlertTitle>
        </Alert>
      </div>
    )
  }

  if (!data.success) {
    return (
      <div className="flex justify-center">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {data.payload?.map((link) => (
        <Card
          data-testid={"user-links"}
          key={link.id}
          title={link.title}
          shortCode={link.shortCode}
          id={link.id}
        />
      ))}
    </div>
  )
}
