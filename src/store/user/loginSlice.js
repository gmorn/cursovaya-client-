import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserServise from "../../services/UserService";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ( { name, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await UserServise.login(name, password)

      dispatch(pullUser(response.data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchNewUserLogo = createAsyncThunk(
  'user/fetchNewUserLogo',
  async ( { path }, {dispatch}) => {
    console.log(path);
    dispatch(newUserLogo(path))

  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ name, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await UserServise.reg(name, password)

      dispatch(pullUser(response.data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        status: null,
        error: null,
    },
    reducers: {
      newUserLogo(state, action) {
        state.user.userLogo = action.payload
        console.log(state.user.userLogo);
        let date = new Date()
        date.setTime(date.getTime() + (24*60*60*1000))
        const expires = 'expires' + date.toUTCString()

        document.cookie = `userLogo=${state.user.userLogo}; expires=${expires}; path=/`

      },
      pullUser(state, action) {
        if (!action.payload) {
          if (document.cookie) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith('name' + '=')) {
                state.user.name = cookie.substring('name'.length + 1) 
              }
              if (cookie.startsWith('userLogo' + '=')) {
                state.user.userLogo = cookie.substring('userLogo'.length + 1) 
              }
              if (cookie.startsWith('jwt' + '=')) {
                state.user.jwt = cookie.substring('jwt'.length + 1) 
              }
              if (cookie.startsWith('id' + '=')) {
                state.user.id = cookie.substring('id'.length + 1) 
              }
              if (cookie.startsWith('role' + '=')) {
                state.user.role = cookie.substring('role'.length + 1) 
              }
              
            }
          } 
        }else {
          state.user = action.payload

          let date = new Date()
          date.setTime(date.getTime() + (24*60*60*1000))
          const expires = 'expires' + date.toUTCString()
          document.cookie = `name=${state.user.name}; expires=${expires}; path=/`
          document.cookie = `userLogo=${state.user.userLogo}; expires=${expires}; path=/`
          document.cookie = `jwt=${state.user.jwt}; expires=${expires}; path=/`
          document.cookie = `id=${state.user.id}; expires=${expires}; path=/`
          document.cookie = `role=${state.user.role}; expires=${expires}; path=/`
        }
        
      },
      logautUser(state) {
        document.cookie = `name=${state.user.name}; max-age=0; path=/`
        document.cookie = `userLogo=${state.user.userLogo}; max-age=0; path=/`
        document.cookie = `jwt=${state.user.jwt}; max-age=0; path=/`
        document.cookie = `id=${state.user.id}; max-age=0; path=/`
        document.cookie = `role=${state.user.role}; max-age=0; path=/`

        state.user = {}
      }
    },
    extraReducers: {
      [fetchUser.pending]: (state) => {
        state.status = 'loading'
        state.error = null
      },
      [fetchUser.fulfilled]: (state) => {
          state.status = 'resolved'
      },
      [fetchUser.rejected]: setError,
      [createUser.rejected]: setError,
    }
})

export const { pullUser, logautUser, newUserLogo } = userSlice.actions

export default userSlice.reducer