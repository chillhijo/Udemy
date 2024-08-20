import {test, expect, request} from "@playwright/test";

const loginPayload = {userEmail:"duskokona93@gmail.com",userPassword:"Sifraa1!"};
const orderPayload = {orders:[{country:"Congo, the Democratic Republic of the",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]};
let loginToken;
let orderId;
test.beforeAll( async ({  }) => {

    //Login
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login", 
        {data: loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    
    const loginResponseJson = await loginResponse.json();
    loginToken = loginResponseJson.token;
    console.log(loginToken);    

    //Create order
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {data: orderPayload,
        headers: {
            'Authorization' : loginToken,
            'Content-ype' : 'application/json'
        }});
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
});

test('Client App login', async ({page})=> {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

    await page.goto("https://rahulshettyacademy.com/client");
    // const product = page.locator(".card-body");
    // const itemName = page.locator(".card-body b");
    // const productName = "ZARA COAT 3";
    // const cartBtn = page.locator("[routerlink*='cart']");
    // const cartItemName = page.locator("h3:has-text('ZARA COAT 3')");
    // const checkoutBtn = page.locator("text='Checkout'");
    // const orderCountry = page.locator("[placeholder*='Country']");
    // const countryDropdown = page.locator(".ta-results");
    
    // //Retrieve all products from page
    // await itemName.first().waitFor();

    // //Retrieve num of products
    // const prodCount = await product.count();
    // for(let i = 0; i < prodCount; i++) {
    //     if(await product.nth(i).locator("b").textContent() == productName) {

    //         //Add to cart
    //         await product.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    // //Enter cart
    // await cartBtn.click();
    // await expect (cartItemName.isVisible()).toBeTruthy();

    // await checkoutBtn.click();

    // //Select Country where to order
    // await orderCountry.pressSequentially("Bosnia");
    // await countryDropdown.waitFor();
    // await countryDropdown.locator("button").click();

    // //Verify email and submit order
    // await expect (page.locator(".user__name [type='text']").first()).toHaveText("duskokona93@gmail.com");
    // await page.locator(".action__submit").click();

    // //Verify thank you order message
    // const thankYou = page.locator(".hero-primary");
    // await expect (thankYou).toHaveText(" Thankyou for the order. ");

    // //Get the orderId and store it
    // await page.waitForSelector(".em-spacer-1 .ng-star-inserted");
    // const itemId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(itemId);

    // //Confirm order from Order history
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("tbody").waitFor();

    const ordersId = await page.locator("tbody tr");

    for(let i = 0; i < await ordersId.count(); i++) {
        const rowOrderId = (await ordersId.nth(i).locator("th").textContent()).trim();

        if(orderId.includes(rowOrderId)) {
            await ordersId.nth(i).locator("button").first().click();
            break;
        }
    }
   
    //Order detailes
    const orderIdDetailes = await page.locator(".col-text").textContent();
    await expect(itemId.includes(orderIdDetailes)).toBeTruthy();
});