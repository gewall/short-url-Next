import test, { expect } from "@playwright/test"

test.describe("Register Page", () => {
  test("should register with valid values", async ({ page }) => {
    await page.goto("/register")
    await page.fill("input[name='username']", "abcdef")
    await page.fill("input[name='password']", "password")
    await page.click("button[type='submit']")
  })

  test("should not register with invalid values", async ({ page }) => {
    await page.goto("/register")
    await page.fill("input[name='username']", "")
    await page.fill("input[name='password']", "")
    await page.click("button[type='submit']")
    await expect(page.getByText(/too small/i)).toHaveCount(2)
  })

  test("should display error toast", async ({ page }) => {
    await page.goto("/register")
    await page.fill("input[name='username']", "")
    await page.fill("input[name='password']", "")
    await page.click("button[type='submit']")
    await expect(page.getByText(/too small/i)).toHaveCount(2)
    await expect(page.getByText(/registration failed/i)).toBeVisible()
  })
})
