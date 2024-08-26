class APIutils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken() {
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            {data: loginPayload});
        expect(loginResponse.ok()).toBeTruthy();
        
        const loginResponseJson = await loginResponse.json();
        loginToken = loginResponseJson.token;
        return loginToken;
        console.log(loginToken);  
    }

}