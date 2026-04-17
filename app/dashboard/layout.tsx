import Footer from "@/components/Footer"
import Menubar from "@/components/Menubar"
import Navbar from "@/components/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="space-y-4 md:space-y-0">
        <Navbar />
        <Menubar />
      </div>
      <div className="flex-1 py-2">{children}</div>
      <Footer />
    </div>
  )
}
