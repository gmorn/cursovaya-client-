import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getComments = createAsyncThunk(
    'comment/getComments',
    async (  id , { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.get(`http://cursovaya/comments/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewcomment = createAsyncThunk(
    'comment/addNewcomment',
    async (  { userId, prodId, description, rating } , { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`http://cursovaya/newcomment`, {
                userId,
                prodId,
                description,
                rating,
            })
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

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getComments.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getComments.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.comments = action.payload
        },
        [getComments.rejected]: setError,
        [addNewcomment.pending]: (state) => {
            state.error = null
            state.status = 'loading'
        },
            [addNewcomment.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.comments.push(action.payload)
        },
        [addNewcomment.rejected]: setError,
    }
})

export const {  } = commentSlice.actions

export default commentSlice.reducer