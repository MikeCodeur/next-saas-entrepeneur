import {Button} from "@/app/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="grid h-screen w-screen place-content-center gap-2 text-center">
      <h2 className="text-3xl font-bold">404 Page non trouvé</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          impossible de trouver cette page
        </p>
        <Button asChild>
          <Link href="/">Retour a la page d&apos;accueil</Link>
        </Button>
      </div>
    </div>
  )
}
