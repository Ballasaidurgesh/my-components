import { createSlice } from "@reduxjs/toolkit";

type state = {
  page: number;
  limit: number;
  isLoading: boolean;
  selectedRows: { [key: string]: any }[];
  filters: { [key: string]: string | number };
  sortBy: {};
};

const initialState: state = {
  page: 1,
  limit: 10,
  selectedRows: [],
  filters: {},
  sortBy: {},
  isLoading: false,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },

    updateLimit: (state, action) => {
      state.limit = action.payload;
    },

    updateSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },

    updateFilters: (state, action) => {
      state.filters = action.payload;
    },

    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearFilters: (state) => {
      state.filters = {};
    },

    resetTableData: () => initialState,
  },
});

export const {
  updateFilters,
  updateLimit,
  updateLoading,
  updatePage,
  updateSelectedRows,
  updateSortBy,
  clearFilters,
  resetTableData,
} = tableSlice.actions;
export default tableSlice.reducer;
