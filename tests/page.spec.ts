import test, { expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("should display navigation bar", async ({ page }) => {
    await page.goto("/")

    const navBar = page.getByRole("navigation")
    await expect(navBar).toBeVisible()
    await expect(navBar).toHaveText(/Shortle/i)
    const loginButton = navBar.getByRole("link", { name: /login/i })
    await expect(loginButton).toBeVisible()
  })

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/")
    const navBar = page.getByRole("navigation")
    const loginButton = navBar.getByRole("link", { name: /login/i })
    await loginButton.click()
    await page.waitForURL("/login")
    await expect(page).toHaveURL("/login")
  })

  test("should display hero correctly", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: /sharing/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /simplify/i })).toBeVisible()
    await expect(page.getByText(/turn long/i)).toBeVisible()
    await expect(
      page.getByRole("link", { name: /start sharing/i })
    ).toBeVisible()

    await expect(page.getByText(/try it/i)).toBeVisible()
    await expect(page.getByPlaceholder(/enter your long url/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /generate/i })).toBeVisible()
    await expect(page.getByText(/result/i)).toBeVisible()
    await expect(page.getByText(/https:\/\/shortle/i)).toBeVisible()
  })

  test("should display features correctly", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: /features/i })).toBeVisible()
    await expect(page.getByTestId(/features-list/)).toHaveCount(3)
  })

  test("should display how it works correctly", async ({ page }) => {
    await page.goto("/")

    await expect(
      page.getByRole("heading", { name: /how it works/i })
    ).toBeVisible()
    await expect(page.getByTestId(/hiw-list/)).toHaveCount(3)
  })

  test("should display FAQ correctly", async ({ page }) => {
    await page.goto("/")

    await expect(
      page.getByRole("heading", { name: /Frequently Asked Questions/i })
    ).toBeVisible()
    await expect(page.getByTestId(/faq-list/)).toHaveCount(4)
  })

  test("should display CTA correctly", async ({ page }) => {
    await page.goto("/")
    const title = page.getByLabel("cta-title")
    const desc = page.getByLabel("cta-description")
    await expect(title).toBeVisible()
    await expect(title).toHaveText(/Create/i)
    await expect(desc).toBeVisible()
    await expect(desc).toHaveText(/Simple/i)
  })

  test("should redirect to login from cta", async ({ page }) => {
    await page.goto("/")
    const btn = page.getByLabel("cta-login")
    await btn.click()
    await expect(page).toHaveURL("/login")
  })
})
