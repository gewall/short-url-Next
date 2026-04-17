import Footer from "@/components/Footer"
import LPNavbar from "@/components/LPNavbar"

interface LayoutHomeProps {
  children: React.ReactNode
}

export default function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <div className="flex w-full flex-col">
      <LPNavbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
