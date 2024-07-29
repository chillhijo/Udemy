import { test, expect } from '@playwright/test';

test('First Playwright test', async ({page})=> {
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const singInBtn = page.locator("#signInBtn");
    const iPhone = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await singInBtn.click();
    await page.locator("[style*='block']").textContent();
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.clear();
    await userName.fill("rahulshettyacademy");
    await singInBtn.click();

    const iPhoneText = await iPhone.first().textContent();
    console.log(iPhoneText);
    console.log(await iPhone.nth(1).textContent());

    const allTitles = await iPhone.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async({page})=> {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const dropdown = page.locator("select.form-control");
    const radioBtn = page.locator(".radiotextsty");
    const okBtn = page.locator("#okayBtn");
    const terms = page.locator("#terms");
    const blinkText = page.locator("#blinkingText");
    const blinkingLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");

    //click on the radio button
    await radioBtn.last().click();
    await okBtn.click();

    //assert user is selected
    await expect(radioBtn.last()).toBeChecked();
    console.log((await radioBtn).last().isChecked());

    //select user from dropdown
    await dropdown.selectOption("consult");
    // await page.pause();

    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await(terms).isChecked()).toBeFalsy();

    await expect(blinkingLink).toHaveAttribute("class", "blinkingText");
});

test.only('Child windows handling', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");

    //asinhrono izvrsavanje funkcija, ali sledeca nece poceti dok prva ne bude izvrsena. Zato koristimo Promise (pending, rejected, fulfiled)
    const [newPage] = await Promise.all([ 
    context.waitForEvent('page'),
    blinkingLink.click()
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const email = arrayText[1].split(" ")[0];
    console.log(email);

    await userName.fill(email);
    await page.pause();
    console.log(await userName .textContent());
})