import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    //первый параметр при вызове функции 
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await ProductService.getProducts()
            
            dispatch(changeCurrentItems(0))
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const productsSlise = createSlice({
    name: 'products',
    initialState: {
        products: [],
        currentProducts: [],
        status: null,
        error: null,
    },
    reducers: {
        changeCurrentItems(state, action) {
            if (action.payload === 'all') {
                state.currentProducts = state.products
            } else {
                state.currentProducts = state.products.filter(product => product.category === action.payload)
            }
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.products = action.payload
        },
        [fetchProducts.rejected]: setError,
    }    
})

export const { changeCurrentItems } = productsSlise.actions

export default productsSlise.reducer