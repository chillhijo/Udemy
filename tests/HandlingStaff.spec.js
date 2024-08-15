import {test, expect  } from "@playwright/test";

test('Handling validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.pause();
    // await page.goBack();
    // await page.goForward();

    //Hidden element validations
    await expect(page.locator("[name='show-hide']")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("[name='show-hide']")).toBeHidden();

    //Alert popup(dialog) handling
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //Hover handling
    await page.pause();
    await page.locator("#mousehover").hover();

    //Handling iFrames
    
})
