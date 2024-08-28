import {test, expect} from "@playwright/test";

test('mmc login', async ({ page }) => {
    await page.goto("http://10.29.10.25/managementcenter/#/");
    await page.waitForLoadState('networkidle');

    //login modal form
    await page.locator('.ng-pristine.ng-invalid.ng-touched').isVisible();
    await page.locator('.p-dropdown.p-component').isVisible();
    await page.getByText('Default tenant/personality id').isVisible();
    const loginNameInput = page.locator('input[formcontrolname = "loginName"]');
    const passwordInput = page.locator('input[formcontrolname = "password"]');
    const loginButton = page.locator('button:has-text("Login")');
    const cancelButton = page.locator('button:has-text("Cancel")');

    //Positive login Test case
    await loginNameInput.fill("dusko.pralica");
    await passwordInput.fill("1");
    await loginButton.click();

    //pool selection modal
    await page.locator('tbody').waitFor();
    const poolSelectionModal = await page.locator('#dlg-m0dh1ebo-n07jg3').isVisible();
    const poolTable = await page.locator("tbody tr");
    const selectPoolBtn = page.getByRole('button', {name: 'Select'});

    //pool selection
    const pools = await poolTable.count();
    console.log("Pools: " + pools);

    for(let i = 0; i < pools; i++) {
        const poolName = await poolTable.nth(i).locator('td').textContent();

        if(poolName.includes('Bosnia 05')) {
            await poolTable.nth(i).click();
            console.log("You found the right one!");
            selectPoolBtn.click();
            break;
        }
    }

    //home page header
    await expect(page.locator('#portal-title')).toHaveText("Management Center");
})
