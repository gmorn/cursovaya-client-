import { createSlice } from "@reduxjs/toolkit";

const categoriesSlise = createSlice({
    name: 'categories',
    initialState: {
        categories: [
            {
                title: 'all',
                name: 'все'
            },
            {
                title: 'pizza',
                name: 'пицца'
            },
            {
                title: 'sweetness',
                name: 'сладости'
            },
            {
                title: 'steak',
                name: 'стейки'
            },
            {
                title: 'coffee',
                name: 'кофе'
            },
            {
                title: 'cocktail',
                name: 'коктели'
            },
            {
                title: 'burger',
                name: 'бургеры'
            },
        ],
        mainCategory: 0,
    },
    reducers: {
        switchCategory(state, action) {
            state.mainCategory = action.payload
            console.log( state.mainCategory )
        }
    }
})

export default categoriesSlise.reducer