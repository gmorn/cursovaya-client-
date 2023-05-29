import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserService from "../../services/UserService"

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ( _, { rejectWithValue }) => {
        try {
            const response = await UserService.getUsers()

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

const usersSlise = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null,
    },
    reducers: {
        getUsers(state, action) {
            state.categories = action.payload
        },
        deliteUsers(state, action) {
            state.mainCategory = action.payload
        },
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.users = action.payload
        },
        [fetchUsers.rejected]: setError,
    }   
})

export const {  } = usersSlise.actions

export default usersSlise.reducer