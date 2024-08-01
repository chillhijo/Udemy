import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.only('Client App login', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/client");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const product = page.locator(".card-body");
    const itemName = page.locator(".card-body b");
    const productName = "ZARA COAT 3";
    const cartBtn = page.locator("[routerlink*='cart']");
    const cartItemName = page.locator("h3:has-text('ZARA COAT 3')");
    const cart = page.locator(".cart");
    const itemInCart = page.locator(".cartWrap");
    const checkoutBtn = page.locator("text='Checkout'");
    const orderCountry = page.locator("[placeholder*='Country']");
    const countryDropdown = page.locator(".ta-results");

    //Login part
    await userName.fill("duskokona93@gmail.com");
    await password.fill("Sifraa1!");
    await loginBtn.click();
    
    //Retrieve all products from page
    await itemName.first().waitFor();
    const itemTitles = await itemName.allTextContents();

    //Retrieve num of products
    const prodCount = await product.count();
    for(let i = 0; i < prodCount; i++) {
        if(await product.nth(i).locator("b").textContent() == productName) {

            //Add to cart
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //Enter cart
    await cartBtn.click();
    await expect (cartItemName.isVisible()).toBeTruthy();

    await checkoutBtn.click();

    //Select Country where to order
    await orderCountry.pressSequentially("Bosnia");
    await countryDropdown.waitFor();
    await countryDropdown.locator("button").click();

    //Verify email and submit order
    expect (page.locator(".user__name [type='text']").first()).toHaveText("duskokona93@gmail.com");
    await page.locator(".action__submit").click();

    expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //Get the orderId
    const orderId = [];
    await page.waitForSelector(".em-spacer-1 .ng-star-inserted");
    const itemId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(itemId);
   
    // for(const item of itemId) {
    //     const id = await item.textContent();
    //     // console.log('ExtractedID: ${id}');
    //     orderId.push(id);
    // }

    // console.log("Item IDs: ", orderId);

});