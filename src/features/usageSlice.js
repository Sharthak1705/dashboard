import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async fetch with 1s simulated delay
export const fetchUsage = createAsyncThunk("usage/fetchUsage", async () => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch("/data/usage.json");
        const data = await res.json();
        resolve(data);
      } catch {
        reject("Failed to load JSON");
      }
    }, 1000);
  });
  return response;
});

const usageSlice = createSlice({
  name: "usage",
  initialState: {
    data: [],
    loading: false,
    error: null,
    filterStatus: "All",
    currentPage: 1,
    rowsPerPage: 5,
  },
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilterStatus, setCurrentPage } = usageSlice.actions;
export default usageSlice.reducer;
