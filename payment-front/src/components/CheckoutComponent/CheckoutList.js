import React from 'react';
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material"

const CheckoutList = ({ cart }) => {

    const GetItemList = () => {
        return cart.map(item => {
            return (
                <ListItem key={item.id}>
                    <Grid container>
                        <Grid item lg={6} sx={{ textAlign: "left" }}>
                            <ListItemText primary={item.name} />
                        </Grid>
                        <Grid item lg={2} sx={{ textAlign: "right" }}>
                            <ListItemText primary={item.price} />
                        </Grid>
                    </Grid>
                </ListItem>
            )
        })
    }

    const GetSumListItem = () => {
        let sum;
        if (cart.length ===0 ) sum = 0;
        else sum = cart.map(item => item.price).reduce((prev, next) => prev + next)
        return (
            <ListItem >
                <Grid container>
                    <Grid item lg={6} sx={{ textAlign: "left" }}>
                        <ListItemText primary={"Total"} />
                    </Grid>
                    <Grid item lg={2} sx={{ textAlign: "right" }}>
                        <ListItemText primary={sum} />
                    </Grid>
                </Grid>
            </ListItem>
        )
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <GetItemList />
            <Divider />
            <GetSumListItem />
        </List>
    )

}

export default CheckoutList