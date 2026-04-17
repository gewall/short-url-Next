import Container from "@/components/Container"
import DataList from "./DataList"
import { Item } from "@/components/ui/item"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import AddLink from "./_components/AddLink"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your short URLs and analytics.",
}

export default function Home() {
  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Item
            variant={"outline"}
            className="relative flex justify-center text-cyan-700"
            aria-label="add link"
          >
            <div className="z--10 absolute top-0 left-0 flex h-full w-full justify-center bg-linear-to-br from-cyan-300 to-purple-400 opacity-20 blur-md"></div>
            <PlusCircle />
            Add Link
          </Item>
        </DialogTrigger>
        <AddLink />
      </Dialog>
      <div className="mt-2">
        <DataList />
      </div>
    </Container>
  )
}
