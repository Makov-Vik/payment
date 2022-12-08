import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import './Product.css'

const Product = ({ product, cart, setCart }) => {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        product.quantity = quantity
        if (quantity === 0) {
            let newCart = cart.filter(products => products.id !== product.id)
            setCart(newCart)
        }
    }, [quantity])

    return (
        <Card sx={{ height: '450px', width: '80%', margin: 'auto' }}>
            <CardHeader
                sx={{
                    height: '100px'
                }}
                title={product.name}
            />
            <CardMedia
                sx={{
                    height: '200px',
                    width: '80%',
                    margin: 'auto'
                }}
                component="img"
                image={product.image}
                alt={product.title}
            />
            <CardContent sx={{
                height: '5%',
                margin: 'auto'
            }}>
                <Typography sx={{
                    height: '100%',
                    margin: 'auto'
                }} variant="body2" color="text.secondary">
                    {product.description.substring(0, 200)}
                </Typography>
            </CardContent>
            <CardActions>
                <RenderCardActions setQuantity={setQuantity} product={product} cart={cart} setCart={setCart} />
            </CardActions>
        </Card>
    )
}

const RenderCardActions = ({ setQuantity, product, cart, setCart }) => {


    const addToCart = () => {
        setQuantity(1);
        setCart([...cart, product])
    }
     
    return (
            <Button sx={{ width: '80%', margin: 'auto' }} variant="contained" onClick={addToCart}>Add to cart</Button>
    )
 
    
}

export default Product;