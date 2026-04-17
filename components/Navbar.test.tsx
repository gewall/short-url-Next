import { render, screen, cleanup } from "@testing-library/react"
import { describe, it, expect, vi, afterEach } from "vitest"
import Navbar from "./Navbar"

// Kita mock komponen Logo agar test Navbar tidak bergantung pada isi Logo
vi.mock("./Logo", () => ({
  default: () => <div data-testid="mock-logo">Logo</div>,
}))

afterEach(() => {
  cleanup() // Memastikan DOM bersih setelah setiap satu blok test selesai
})

describe("Navbar Component", () => {
  it("harus merender Logo ", () => {
    render(<Navbar />)

    expect(screen.getByTestId("mock-logo")).toBeDefined()
  })

  it("harus menampilkan input search yang berbeda untuk mobile dan desktop", () => {
    render(<Navbar />)

    // Mencari semua input dengan placeholder "Search..."
    const searchInputs = screen.getAllByPlaceholderText("Search...")

    // Pastikan ada 2 (satu untuk desktop hidden-md, satu untuk mobile md-hidden)
    expect(searchInputs).toHaveLength(2)
  })

  it("harus memiliki struktur navigasi (tag nav)", () => {
    render(<Navbar />)
    const navElement = screen.getByRole("navigation", { name: "main-nav" })
    expect(navElement).toBeDefined()
  })
})
