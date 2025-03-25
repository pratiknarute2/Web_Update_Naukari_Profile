import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uatdreamcity.kolonizer.in/login');
  await page.getByText('Enter Username').click();
  await page.getByRole('textbox', { name: 'Enter Username' }).fill('nikhil@kolonizer.com');
  await page.getByText('Enter Password').click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('123');
  await page.getByRole('button', { name: 'login' }).click();


  await page.getByText('Booked').nth(3).click();
});