import { test, expect } from '@playwright/test';

test('NAV-LOGIN-001: Navegación correcta después de iniciar sesión', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('input[placeholder="Usuario"]', '123'); 
  await page.fill('input[placeholder="Contraseña"]', '123');

  await page.click('button:has-text("Iniciar Sesion")');

  await expect(page).toHaveURL("http://localhost:4200/menu");
});