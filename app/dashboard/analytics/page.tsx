import Container from "@/components/Container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Analytic() {
  return (
    <Container>
      <div className="flex justify-center">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Not yet implemented</AlertTitle>
          <AlertDescription>
            Overall analytics will be available soon.
          </AlertDescription>
        </Alert>
      </div>
    </Container>
  )
}
