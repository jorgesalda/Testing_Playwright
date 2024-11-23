import { test, expect } from '@playwright/test';

test('Registrar usuario con clave inválida - Validar restricción', async ({ page }) => {
  test.setTimeout(60000);

  // Navegar a la página de registro
  await page.goto('https://buggy.justtestit.org/register');
  await page.waitForSelector('input#username'); // Esperar a que el formulario esté cargado

  // Completar los campos del formulario
  await page.fill('input#username', 'usuarioInvalido');
  await page.fill('input#firstName', 'Juan');
  await page.fill('input#lastName', 'Pérez');
  await page.fill('input#password', 'ABCDE'); // Contraseña inválida
  await page.fill('input#confirmPassword', 'ABCDE');

  // Localizar y verificar que el botón de registro esté habilitado
  const registerButton = page.locator('button.btn.btn-default[type="submit"]');
  await expect(registerButton).toBeEnabled();

  // Hacer clic en el botón de registro
  await registerButton.click();

  // Validar el mensaje de error relacionado con la contraseña
  const errorMessage = page.locator('.result.alert.alert-danger', { hasText: 'minimum field size of 6' });
  await expect(errorMessage).toBeVisible({ timeout: 10000 });

  // Captura una captura de pantalla final
  await page.screenshot({ path: 'registro-error-screenshot.png' });
});