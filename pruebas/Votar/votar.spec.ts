import { test, expect } from '@playwright/test';

test('Validar votación por auto solo para usuarios autenticados', async ({ page }) => {
  // Paso 1: Navegar a la página
  await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vlg');

  // Paso 2: Ingresar credenciales válidas
  await page.fill('input[name="login"]', 'capacho'); // Campo Login
  await page.fill('input[name="password"]', 'Jorge120@'); // Campo Password

  // Paso 3: Hacer clic en "Login"
  const loginButton = page.locator('button.btn-success[type="submit"]');
  await expect(loginButton).toBeEnabled();
  await loginButton.click();


  // Paso 5: Esperar que el botón "Vote!" sea visible
  await page.waitForTimeout(2000); // Espera 2 segundos por si hay carga dinámica
  const voteButton = page.locator('button:has-text("Vote!")');
  await expect(voteButton).toBeVisible({ timeout: 10000 });

  // Paso 6: Escribir un comentario opcional
  await page.fill('textarea#comment', '¡Excelente modelo de auto!');

  // Paso 7: Hacer clic en "Vote!"
  await voteButton.click();

  // Paso 8: Validar que el voto fue exitoso
  const successMessage = page.locator('text=Thank you for your vote!');
  await expect(successMessage).toBeVisible({timeout: 5000});
});