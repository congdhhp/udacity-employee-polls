import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    tasks: {} // Lưu trữ trạng thái loading của từng tác vụ
  },
  reducers: {
    // Đặt trạng thái loading cho một tác vụ cụ thể
    setLoading: (state, action) => {
      const { taskName, isLoading } = action.payload;
      state.tasks[taskName] = isLoading;
    },

    // Xóa trạng thái loading cho một tác vụ cụ thể
    clearLoading: (state, action) => {
      const { taskName } = action.payload;
      delete state.tasks[taskName];
    },

    // Reset tất cả trạng thái loading
    resetLoading: (state) => {
      state.tasks = {};
    }
  }
});

export const { setLoading, clearLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
