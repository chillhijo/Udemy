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
    const apiUtils = new APIutils(apiContext);



    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

    await page.goto("https://rahulshettyacademy.com/client");
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
    await expect(orderId.includes(orderIdDetailes)).toBeTruthy();
});