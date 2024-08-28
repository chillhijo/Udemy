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
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data: orderPayload,
            headers: {
                'Authorization' : response.token,
                'Content-ype' : 'application/json'
            }});
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        console.log(response);
        return response;
    }

}

module.exports = {APIutils};