import test, { expect } from "@playwright/test"

test.describe("Login Page", () => {
  test("should login with valid values", async ({ page }) => {
    await page.goto("/login")
    await page.fill("input[name='username']", "abcdef")
    await page.fill("input[name='password']", "password")
    await page.click("button[type='submit']")
  })

  test("should not login with invalid values", async ({ page }) => {
    await page.goto("/login")
    await page.fill("input[name='username']", "")
    await page.fill("input[name='password']", "")
    await page.click("button[type='submit']")
    await expect(page.getByText(/too small/i)).toHaveCount(2)
  })

  test("should display error toast", async ({ page }) => {
    await page.goto("/login")
    await page.fill("input[name='username']", "")
    await page.fill("input[name='password']", "")
    await page.click("button[type='submit']")
    await expect(page.getByText(/too small/i)).toHaveCount(2)
    await expect(page.getByText(/login failed/i)).toBeVisible()
  })
})
