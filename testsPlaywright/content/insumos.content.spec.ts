import { test, expect } from '@playwright/test';

test('CT-INSUMOS-001: Verificar contenido en la pantalla de Insumos', async ({ page }) => {
  // Paso 1: Navegar a la página de insumos
  await page.goto('http://localhost:4200/insumo');

  // Paso 2: Verificar que el título "Insumos" esté visible
  const tituloInsumos = page.getByRole('heading', { name: /Insumos/i });
  await expect(tituloInsumos).toBeVisible();

  // Paso 3: Verificar que el botón "Crear Insumo" esté visible
  const botonCrear = page.getByRole('button', { name: /Añadir insumo/i });
  await expect(botonCrear).toBeVisible();
});