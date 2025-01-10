import {describe, expect, it, vi} from "vitest"
import {render, screen} from "@testing-library/react"

import Home from "@/app/(pages)/page"

vi.mock("@/app/components/layout/header", () => {
  return {
    __esModule: true,
    default: () => <></>,
  }
})
describe("app", () => {
  it("render title home page with `Plateforme de tracker pour les entrepreneur`", () => {
    render(<Home />)
    const text = screen.getByText(
      /plateforme de tracker pour les entrepreneur/i
    )
    expect(text).toBeInTheDocument()
  })
})
