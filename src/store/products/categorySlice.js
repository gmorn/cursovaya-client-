import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../services/CategoryService";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async ( _, { rejectWithValue } ) => {
        try {
            const response = await CategoryService.getCategory()

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

const categoriesSlise = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        mainCategory: 'all',
        status: null,
        error: null,
    },
    reducers: {
        getCategories(state, action) {
            state.categories = action.payload
        },
        switchCategory(state, action) {
            state.mainCategory = action.payload
        },
    },
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.categories = action.payload
        },
        [fetchCategories.rejected]: setError,
    }   
})

export const { switchCategory } = categoriesSlise.actions

export default categoriesSlise.reducer