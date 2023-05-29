import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice ({
    name: 'orders',
    initialState: {
        orders: [],
    },
    reducers: {
        addNewOrder(state, action) {
            const cloneOrder = state.orders.find(order => order.id === action.payload.id)

            if ( cloneOrder ) {
                cloneOrder.count = Number(cloneOrder.count) + 1
            } else {
                state.orders.push(action.payload)
            }
        },
        deliteOrder(state, action) {
            state.orders = state.orders.filter(order => order.id !== action.payload)
        },
        incrementCount(state, action) {
            const cloneOrder = state.orders.find(order => order.id === action.payload.id)

            cloneOrder.count = Number(cloneOrder.count) + 1
        },
        decrementCount(state, action) {
            const cloneOrder = state.orders.find(order => order.id === action.payload.id)
            
            if (Number(cloneOrder.count) > 1) {
                cloneOrder.count = Number(cloneOrder.count) - 1
            }
        },
        deliteOrders(state) {
            state.orders = []
        }
    }
})

export const { addNewOrder, deliteOrder, incrementCount, decrementCount, deliteOrders } = orderSlice.actions

export default orderSlice.reducer