"use client"
import {IconForErrorType} from "@/app/components/error-icon"
import {Button} from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

type ErrorProps = {
  error: Error & {digest?: string}
  reset: () => void
}
export default function Error({error, reset}: ErrorProps) {
  const router = useRouter()
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="grid h-screen w-full place-content-center gap-4">
      <Card>
        <CardHeader className="text-center font-bold">
          {error.message}
        </CardHeader>
        <CardContent>
          <IconForErrorType error={error} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/")} className="w-fit">
            Retour à l&apos;accueil
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
