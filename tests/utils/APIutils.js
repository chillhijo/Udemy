class APIutils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data: this.loginPayload});
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;
        console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.loginToken = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data: orderPayload,
            headers: {
                'Authorization' : response.loginToken,
                'Content-ype' : 'application/json'
            }});
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return orderId;
    }

}

module.exports = {APIutils};