import { test, expect } from '@playwright/test';

test('Intentar votar por un auto sin estar autenticado', async ({ page }) => {
  // Paso 1: Navegar a la página del modelo de auto
  await page.goto('https://buggy.justtestit.org/model/ckl2phsabijs71623vk0%7Cckl2phsabijs71623vqg');

  // Paso 2: Verificar que el botón "Vote!" NO esté visible para usuarios no autenticados
  const voteButton = page.locator('button:has-text("Vote!")');
  await expect(voteButton).not.toBeVisible();

  // Validar que aparece un mensaje de error/restricción
  const errorMessage = page.locator('text=You need to login to vote');

});