import { test, expect } from '@playwright/test';

test('CT-LOGIN-001: Verificar contenido en la pantalla de Login', async ({ page }) => {
  // Paso 1: Navegar al login
  await page.goto('http://localhost:4200/');

  // Paso 2: Verificar que el campo username existe
  const inputUsername = page.locator('input[placeholder="Usuario"]'); 
  await expect(inputUsername).toBeVisible();

  // Paso 3: Verificar que el campo contraseña existe
  const inputPassword = page.locator('input[placeholder="Contraseña"]'); 
  await expect(inputPassword).toBeVisible();

  // Paso 4: Verificar que el botón "Iniciar sesión" existe
  const botonLogin = page.getByRole('button', { name: /iniciar sesion/i }); 
  await expect(botonLogin).toBeVisible();
});