const { test, expect } = require('@playwright/test');

test('Actualizar perfil de usuario', async ({ page }) => {
    // Ir a la página principal
    await page.goto('https://buggy.justtestit.org/register');

    // Iniciar sesión con un usuario existente
    await page.fill('input[name="login"]', 'matias12399');
    await page.fill('input[name="password"]', 'Jorge120@');
    await page.click('button[type="submit"]');

    // Verificar que el login fue exitoso
    const profileLink = await page.locator('text=Profile');
    await expect(profileLink).toBeVisible();

    // Navegar al perfil del usuario
    await profileLink.click();

    // Actualizar información del perfil
    await page.fill('input[name="firstName"]', 'Juan Actualizado');
    await page.fill('input[name="lastName"]', 'Perez Actualizado');
    await page.fill('textarea[formcontrolname="address"]', 'Calle Actualizada'); 
    await page.fill('input[name="phone"]', '310989334');
    await page.selectOption('select[name="hobby"]', 'Working');


    // Guardar cambios
    await page.click('button[type="submit"]');

    // Verificar mensaje de éxito
    const successMessage = page.locator('.result:visible'); 
    await expect(successMessage).toHaveText('The profile has been saved successful');
});
