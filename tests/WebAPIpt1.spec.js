import {test, expect, request} from "@playwright/test";
import {APIutils} from "./utils/APIutils";

const loginPayload = {userEmail:"duskokona93@gmail.com",userPassword:"Sifraa1!"};
const orderPayload = {orders:[{country:"Congo, the Democratic Republic of the",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]};
// let loginToken;
// let orderId;
let response;

test.beforeAll( async ({  }) => {
    //Login
    const apiContext = await request.newContext();
    const apiUtils = new APIutils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Client App login', async ({page})=> {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    page.pause();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").isVisible();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const ordersId = await page.locator("tbody tr");

    for(let i = 0; i < await ordersId.count(); i++) {
        const rowOrderId = (await ordersId.nth(i).locator("th").textContent()).trim();

        if(response.orderId.includes(rowOrderId)) {
            await ordersId.nth(i).locator("button").first().click();
            break;
        }
    }
   
    //Order detailes
    const orderIdDetailes = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIdDetailes)).toBeTruthy();
});