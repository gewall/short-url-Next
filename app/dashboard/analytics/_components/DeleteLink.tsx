"use client"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUserStore } from "@/lib/store/user"
import { deleteLink } from "../../_actions/item.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DeleteLinkProps {
  id: string
}

export default function DeleteLink({ id }: DeleteLinkProps) {
  const { user } = useUserStore()
  const router = useRouter()
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Link</AlertDialogTitle>
        <AlertDialogDescription>
          This form will delete the link for you.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          onClick={async () => {
            try {
              const req = await deleteLink(id, user.accessToken)

              if (req.success) {
                toast.success("Link deleted successfully", {
                  position: "top-center",
                })
                router.push("/dashboard")
              }
            } catch {
              toast.error("Failed to delete link")
            }
          }}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
