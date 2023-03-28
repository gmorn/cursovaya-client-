import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    //первый параметр при вызове функции 
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('http://cursovaya/getprod')
            if (!response.ok) {
            throw new Error('Server Error!')
            }
            const data = await response.json()
            console.log(data)
            return data
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
        status: null,
        error: null,
    },
    reducers: {

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

export default productsSlise.reducer