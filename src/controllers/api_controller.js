const axios = require('axios');


class jokeApi {
    constructor(){
        this.baseURL = 'https://api.spoonacular.com/food/products/suggest';
        this.axiosNesne = axios.create({
            baseURL : this.baseURL,
            Headers:{
                'Content-Type': 'application/json'
            },
            params:{
                apiKey:'af65556be82546968837f201877d28da',
                query:'chicke',
                number:2
            }

        });
    }
    async apikeys(){
        try {
            const response = await this.axiosNesne.get();
            const productDetails = [];
            for(let product of response.data.results){
            const productId = product.id;
            const url = `https://api.spoonacular.com/food/products/${productId}?apiKey=af65556be82546968837f201877d28da`;
            const productResponse = await axios.get(url);
            productDetails.push(productResponse.data);
            }
            return {products:productDetails};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}






const apitest = async (req, res, next) => {
    const kontrol = new jokeApi();
    const apikeys = await kontrol.apikeys();
    res.render('api/index', { layout: false, apikeys});
}

module.exports = {
    apitest,
};
