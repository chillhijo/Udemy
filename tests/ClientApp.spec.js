import { test, expect } from '@playwright/test';

test.only('Client App login', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/client");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const product = page.locator(".card-body");
    const itemName = page.locator(".card-body b");
    const productName = "ZARA COAT 3";

    //Login part
    await userName.fill("duskokona93@gmail.com");
    await password.fill("Sifraa1!");
    await loginBtn.click();
    
    //Retrieve all products from page
    await itemName.first().waitFor();
    const itemTitles = await itemName.allTextContents();
    console.log(itemTitles);

    //Retrieve num of products
    const prodCount = await product.count();
    for(let i = 0; i < prodCount; i++) {
        if(await product.nth(i).locator("b").textContent() == productName) {

            //Add to cart
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.pause();
});