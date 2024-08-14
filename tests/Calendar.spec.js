import {test, expect  } from "@playwright/test";

test("Calendar", async({page}) => {

    const monthNumber = "6";
    const date = "15";
    const yearNumber = "2027";
    const expectedList = [monthNumber, date, yearNumber];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(yearNumber).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='"+ date +"']").click();

    //Assert the values are correct
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let i = 0; i < inputs.length; i++) {
        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
    }
})