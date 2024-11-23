import { test, expect } from '@playwright/test';

test('Intentar registrar un usuario ya registrado', async ({ page }) => {
  // Navegar a la página de registro
  await page.goto('https://buggy.justtestit.org/register');

  // Esperar a que el formulario esté visible
  await page.waitForSelector('input#username');

  // Llenar los datos válidos del usuario existente
  await page.fill('input#username', 'Antonio50'); // Usuario ya registrado
  await page.fill('input#firstName', 'Antonio');
  await page.fill('input#lastName', 'Santos');
  await page.fill('input#password', 'Password12-'); // Contraseña válida
  await page.fill('input#confirmPassword', 'Password12-');

  // Hacer clic en el botón de registro
  const registerButton = page.locator('button.btn.btn-default[type="submit"]');
  await registerButton.click();

  // Validar el mensaje de error relacionado con el usuario ya registrado
  const errorMessage = page.locator('.result.alert.alert-danger', { 
    hasText: 'User already exists' 
  });
  await expect(errorMessage).toBeVisible({ timeout: 5000 });

});