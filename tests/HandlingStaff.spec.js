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
    await page.locator("#mousehover").hover();

    //Handling iFrames
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const h2Text = await framePage.locator(".text h2").textContent();
    console.log(h2Text.split(" ")[1]);
})
