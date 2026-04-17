import Link from "next/link"
import Container from "./Container"
import { Mail, Paperclip } from "lucide-react"

export default function Footer() {
  return (
    <div className="bottom-0 mt-16 max-h-56 min-h-48 bg-cyan-950 text-primary-foreground">
      <Container className="py-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div className="flex flex-col justify-start">
            <h5 className="text-lg font-semibold" aria-label="footer label">
              Shortle
            </h5>
            <p aria-label="footer description">
              Crafted with code, coffee, and a bit of chaos.
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <h5 className="text-lg font-semibold" aria-label="footer contact">
              Contact Me!
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:algi.nugraha@gmail.com"
                  className="flex gap-2"
                >
                  <Mail className="inline-block" /> alginugraha21@gmail.com
                </Link>
              </li>
              <li>
                <Link href="https://gewall.my.id" className="flex gap-2">
                  <Paperclip className="inline-block" />
                  Portofolio Web
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center text-sm">© 2026 Algi Nugraha</p>
        </div>
      </Container>
    </div>
  )
}
