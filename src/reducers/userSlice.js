import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../_DATA";

// Thunk action to fetch users
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const users = await _getUsers();
            return users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {},  // Use an object to store users by ID for easier lookup
        loading: false,
        error: null
    },
    reducers: {
        getUsers: (state) => state.users,
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUserQuestion: (state, action) => {
            const { userId, qId } = action.payload;
            const user = state.users[userId];
            if (user) {
                // Update user's questions list
                user.questions = [...user.questions, qId];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset error on new action
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;  // Assuming action.payload is an object of users
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching users";
            });
    }
});

export const { getUsers, setUsers, addUserQuestion } = userSlice.actions;
export default userSlice.reducer;
