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
        mainCategory: 'all',
    },
    reducers: {
        switchCategory(state, action) {
            state.mainCategory = action.payload
        }
    }
})

export const { switchCategory } = categoriesSlise.actions

export default categoriesSlise.reducer