import { test, expect } from '@playwright/test';

test('Validar votación por auto solo para usuarios autenticados', async ({ page }) => {
  // Paso 1: Navegar a la página
  await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vlg');

  // Paso 2: Ingresar credenciales válidas
  await page.fill('input[name="login"]', 'david30'); // Campo Login
  await page.fill('input[name="password"]', '1234567cD-'); // Campo Password

  // Paso 3: Hacer clic en "Login"
  const loginButton = page.locator('button.btn-success[type="submit"]');
  await expect(loginButton).toBeEnabled();
  await loginButton.click();


  // Paso 8: Validar que el voto ya esta
  const successMessage = page.locator('text=Thank you for your vote!');
  await expect(successMessage).toBeVisible();
});