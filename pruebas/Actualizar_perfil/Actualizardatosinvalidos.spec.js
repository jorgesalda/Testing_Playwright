
const { test, expect } = require('@playwright/test');

test('Actualizar perfil de usuario con el nombre y apellido vacio', async ({ page }) => {
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
    await page.fill('input[name="firstName"]', '');

    // Verificar mensaje de error para "First Name"
    const firstNameError = await page.locator('div.alert.alert-danger', { hasText: 'First Name is required' });
    await expect(firstNameError).toHaveText('First Name is required');

    // Verificar mensaje de error para "Last Name"
    await page.fill('input[name="lastName"]', '');
    const lastNameError = await page.locator('div.alert.alert-danger', { hasText: 'Last Name is required' });
    await expect(lastNameError).toHaveText('Last Name is required');

    // Rellenar otros campos
    await page.fill('textarea[formcontrolname="address"]', 'Calle Actualizada'); // Selector corregido para textarea
    await page.fill('input[name="phone"]', '310989334');
    await page.selectOption('select[name="hobby"]', 'Working');
});
