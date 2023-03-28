import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice ({
    name: 'orders',
    initialState: {
        orders: [],
    },
    reducers: {
        addNewOrder(state, action) {
            state.orders.push(action.payload)
            console.log(action.payload);
        },
        deliteOrder(state, action) {
            state.orders = state.orders.filter(order => order.id !== action.payload)
        }
    }

})

export const { addNewOrder, deliteOrder } = orderSlice.actions

export default orderSlice.reducer