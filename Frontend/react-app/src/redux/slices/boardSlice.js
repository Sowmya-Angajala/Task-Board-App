import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';
// Fetch all boards
export const fetchBoards = createAsyncThunk('board/fetchBoards', async () => {
  const res = await API.get('/boards');
  return res.data;
});
// Create board
export const createBoard = createAsyncThunk('board/createBoard', async (data) => {
  const res = await API.post('/boards', data);
  return res.data;
});
export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => { state.loading = true; })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});
export default boardSlice.reducer;