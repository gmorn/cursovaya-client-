import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',

    

    async ( { name, password }, { rejectWithValue, dispatch }) => {
 
        // const user = {
        //     name,
        //     password,
        // }

        axios.post('http://cursovaya/login', {
            name,
            password,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {

    },
    extraReducers: {

    }
})

// export default {  } = userSlice.actions

export default userSlice.reducer