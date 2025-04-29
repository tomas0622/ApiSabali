import { test, expect } from '@playwright/test';

test('NAV-INSUMOS-001: Navegación hacia la página de Insumos', async ({ page }) => {
  await page.goto('http://localhost:4200/menu');

  await page.click('a[id="Pr"]');

  await expect(page).toHaveURL("http://localhost:4200/insumo");
});
