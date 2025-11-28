import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Scholars of the South Tigris Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Setup AI' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few rounds
  await page.getByRole('button').first().click()
  await page.getByRole('button').first().click()
  await page.getByRole('button').first().click()
  await page.getByRole('button').first().click()

  // end game
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Scholars of the South Tigris Solo Helper')
})
