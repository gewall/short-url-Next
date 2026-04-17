"use client"

import { ActionState } from "@/lib/schemas/action"

import { useEffect, useState } from "react"
import { getLinkById } from "../../_actions/item.action"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Pen, Trash } from "lucide-react"
import NextLink from "next/link"
import { Link } from "@/lib/schemas/link"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import EditLink from "../_components/EditLink"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DeleteLink from "../_components/DeleteLink"
import { useUserStore } from "@/lib/store/user"

interface HeaderProps {
  id: string
}

export default function Header({ id }: HeaderProps) {
  const { user } = useUserStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ActionState<Link>>({
    payload: null,
    success: true,
    error: null,
  })

  useEffect(() => {
    if (user.accessToken === "") return
    ;(async () => {
      try {
        setLoading(true)
        setData(await getLinkById(id, user.accessToken))
        setLoading(false)
      } catch (err: unknown) {
        setData({
          payload: null,
          success: false,
          error: (err as Error).message,
        })
        setLoading(false)
      }
    })()

    return () => {}
  }, [id, user.accessToken])

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner className="size-8 text-cyan-400" />
      </div>
    )
  }

  if (!data.success || data.payload === null) {
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
    <div className="h-max-28 h-min-20 flex h-24 items-start justify-between rounded-sm border px-4 py-2">
      <div className="flex h-full flex-col items-start justify-between">
        <h4 className="text-lg font-semibold" data-testid="title">
          {data.payload?.title}
        </h4>
        <h5 className="text-lg" data-testid="short-code">
          https://shortly.com/{data.payload?.shortCode}
        </h5>
        <NextLink
          href={data.payload?.originalUrl}
          className="text-blue-400 underline"
          data-testid="original-url"
        >
          {data.payload?.originalUrl}
        </NextLink>
      </div>
      <div className="flex h-full flex-col items-end justify-between">
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger
              aria-label="edit link"
              className="flex items-center gap-2"
            >
              <Pen className="inline-block size-4" />
              Edit
            </DialogTrigger>
            <EditLink
              id={data.payload?.id}
              title={data.payload?.title}
              isActive={data.payload?.isActive}
            />
          </Dialog>
          |
          <AlertDialog>
            <AlertDialogTrigger
              aria-label="delete link"
              className="flex items-center gap-2 text-destructive"
            >
              <Trash className="inline-block size-4" />
              Delete
            </AlertDialogTrigger>
            <DeleteLink id={data.payload?.id} />
          </AlertDialog>
        </div>
        {/*<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon-xs"}
              variant={"outline"}
              aria-label="link dropdown"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger aria-label="edit link" className="flex gap-2">
                  <Pen className="inline-block" />
                  Edit
                </DialogTrigger>
                <EditLink
                  id={data.payload?.id}
                  title={data.payload?.title}
                  isActive={data.payload?.isActive}
                />
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <AlertDialog>
                <AlertDialogTrigger
                  aria-label="delete link"
                  className="flex gap-2"
                >
                  <Trash className="inline-block" />
                  Delete
                </AlertDialogTrigger>
                <DeleteLink id={data.payload?.id} />
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>*/}
        <p
          className="mt-auto text-sm font-light italic"
          data-testid="expires-at"
        >
          Expires on: {new Date(data.payload?.expiresAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
