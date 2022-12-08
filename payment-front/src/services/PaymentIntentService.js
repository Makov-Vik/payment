import axios from "axios"

export const createPaymentIntent = (cart, currency) => {
    const products = cart.map(item => {
        return {
            item: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }
    });
    return axios.post("http://localhost:3001/payment", {
        products: products,
        currency: currency
    })
}