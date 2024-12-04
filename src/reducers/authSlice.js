import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../_DATA';

// Tạo async thunk cho login
export const login = createAsyncThunk(
  'auth/login',
  async ({ id, password }) => {
    try {
      const users = await _getUsers();
      const user = users[id];

      // Kiểm tra nếu user tồn tại và mật khẩu chính xác
      if (user && user.password === password) {
        return user;
      }
      return null; // Nếu thông tin không hợp lệ
    } catch (error) {
      throw new Error('Error during login');
    }
  }
);

// Tạo slice cho auth
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authedId: null,      // Không gán giá trị mặc định cố định "abc"
    authedUser: null,
    loading: false,      // Thêm trường loading để theo dõi trạng thái async
    error: null,         // Trường error để lưu lỗi nếu có
  },
  reducers: {
    // Lấy authedId
    getAuthedId: (state) => state.authedId,

    // Set thông tin user đã login
    setAuthedUser: (state, action) => {
      const { user } = action.payload || {};
      state.authedId = user ? user.id : null;
      state.authedUser = user;
    },

    // Đặt lại thông tin người dùng khi logout
    logout: (state) => {
      state.authedId = null;
      state.authedUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Đang xử lý login
        state.error = null; // Reset lỗi cũ
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.authedId = action.payload.id;
          state.authedUser = action.payload;
        } else {
          state.error = 'Invalid credentials'; // Thông báo lỗi nếu login thất bại
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Xử lý lỗi nếu có
      });
  },
});

export const { getAuthedId, setAuthedUser, logout } = authSlice.actions;
export default authSlice.reducer;
