
const { test, expect } = require('@playwright/test');

test('Cambiar contraseña con clave invalida', async ({ page }) => {
    // Ir a la página principal
    await page.goto('https://buggy.justtestit.org/register');

    // Iniciar sesión con un usuario existente
    await page.fill('input[name="login"]', 'Jorge222');
    await page.fill('input[name="password"]', 'Jorge120@');
    await page.click('button[type="submit"]');

    // Verificar que el login fue exitoso
    const profileLink = await page.locator('text=Profile');
    await expect(profileLink).toBeVisible();

    // Navegar al perfil del usuario
    await profileLink.click();

    // Cambiar la contraseña
    await page.fill('input[name="currentPassword"]', 'Jorge120@');
    await page.fill('input[name="newPassword"]', 'juan120@');
    await page.fill('input[name="newPasswordConfirmation"]', 'juan120@');
    await page.click('button[type="submit"]');

    // Verificar el mensaje de error
    const successMessage = page.locator('.result:visible'); 
    await expect(successMessage).toContainText('Password did not conform with policy: Password must have uppercase characters');
});
